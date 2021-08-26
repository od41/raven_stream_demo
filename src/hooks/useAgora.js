import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

// 1. create client
// 2. set client role
// 3. join channel
// 4. when a remote user joins and publishes tracks
//      - listen for user-published event
//      - subscribe to remote user object i.e audio and video tracks
//      - play remote tracks



export default function useAgora(client) {
    const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState(undefined);

    const [remoteVideoTrack, setRemoteVideoTrack] = useState(undefined);
    const [remoteAudioTrack, setRemoteAudioTrack] = useState(undefined);

    const [joinState, setJoinState] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState([]);

    const [joinTime, setJoinTime] = useState(0);


    async function createLocalTracks(audioConfig, videoConfig) {
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
        setLocalAudioTrack(microphoneTrack);
        setLocalVideoTrack(cameraTrack);
        return [microphoneTrack, cameraTrack];
    }

    async function join(appid, channel, token, role, uid) {
        if (!client)
            return;


        if(role === 'host') {
            const [microphoneTrack, cameraTrack] = await createLocalTracks();

            // set Agora client role and latency
            // await client.setClientRole(role)
            await client.setClientRole('host', {latency: 1})
    
            // join channel
            await client.join(appid, channel, token || null, uid || null);
            
            
            
            // play local video track & publish to channel
            await client.publish([microphoneTrack, cameraTrack]);
            console.log("publish success");
            
            window.client = client;
            window.videoTrack = cameraTrack;
            setJoinState(true);

            setJoinTime(Date.now())
            console.log('time', joinTime)
        }  else if (role === 'audience') {
                await client.setClientRole('audience', {latency: 1})

                // join channel
                await client.join(appid, channel, token || null, uid || null);
                const time = new Date().now
                setJoinTime(time)
                

                // add event listener to play remote tracks when remote user publishs.
                client.on("user-published", handleUserPublished);
                client.on("user-unpublished", handleUserUnpublished);
                
                window.client = client;
                setJoinState(true);      
                    
                setJoinTime(Date.now())
                console.log('time', joinTime)
        } else {
            // console.log(role)
            console.error('Unrecognised role.')
        }

       return joinState
    }

    async function leave() {
        if (localAudioTrack || localVideoTrack) {
            localAudioTrack.stop();
            localAudioTrack.close();

            localVideoTrack.stop();
            localVideoTrack.close();

            client.unpublish([localAudioTrack, localVideoTrack])

        }

        setRemoteUsers([]);
        setJoinState(false);
        await (client === null || client === void 0 ? void 0 : client.leave());
    }
    
    const handleUserPublished = async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        // If the subscribed track is an audio track
        if (mediaType === "audio") {
            setRemoteAudioTrack(user.audioTrack);
        } else {
            setRemoteVideoTrack(user.videoTrack);
        }
        console.log('RemoteUsers: ', client.remoteUsers)
        // toggle rerender while state of remoteUsers changed.
        setRemoteUsers(Array.from(client.remoteUsers));
    };

    const handleUserUnpublished = (user) => {
        setRemoteUsers(remoteUsers.filter(item => item.uid !== user.uid) );
    };

    const handleUserJoined = (user) => {
        setRemoteUsers(...remoteUsers, user);
    };

    const handleUserLeft = (user) => {
        setRemoteUsers(remoteUsers.filter(item => item.uid !== user.uid) );
        // setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

    const shareScreen = async () => {
        // const [cameraTrack, microphoneTrack] = await AgoraRTC.createScreenVideoTrack();
        const cameraTrack = await AgoraRTC.createScreenVideoTrack();
        // setLocalAudioTrack(microphoneTrack);
        setLocalVideoTrack(cameraTrack);

        await client.unpublish()

        await client.publish(cameraTrack);
        
        return cameraTrack;
    }

    useEffect(() => {
        if (!client)
            return;
        
        setRemoteUsers(client.remoteUsers);

        client.on('user-published', handleUserPublished);
        client.on('user-unpublished', handleUserUnpublished);
        client.on('user-joined', handleUserJoined);
        client.on('user-left', handleUserLeft);

        return () => {
            client.off('user-published', handleUserPublished);
            client.off('user-unpublished', handleUserUnpublished);
            client.off('user-joined', handleUserJoined);
            client.off('user-left', handleUserLeft);
        };
    }, [client]);

    return {
        localAudioTrack,
        localVideoTrack,
        remoteAudioTrack,
        remoteVideoTrack,
        joinState,
        leave,
        join,
        remoteUsers,
        shareScreen,
        joinTime
    };

}