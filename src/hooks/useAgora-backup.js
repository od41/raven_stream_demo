import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

export default function useAgora(client) {
    const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
    const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
    const [joinState, setJoinState] = useState(false);
    const [remoteUsers, setRemoteUsers] = useState([]);


    async function createLocalTracks(audioConfig, videoConfig) {
        const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
        setLocalAudioTrack(microphoneTrack);
        setLocalVideoTrack(cameraTrack);
        return [microphoneTrack, cameraTrack];
    }

    async function join(appid, channel, token, options, uid) {
        if (!client)
            return;

        // set Agora client role and latency
        const anodaUid = await client.setClientRole(options.role, options.latency)
        console.log('anodaUID: ', anodaUid)
        if (options.role === "audience") {
            // add event listener to play remote tracks when remote user publishs.
            client.on("user-published", handleUserPublished);
            client.on("user-unpublished", handleUserUnpublished);
        }

        // join channel
        await client.join(appid, channel, token || null, uid || null);

        if (options.role === "host") {
            const [microphoneTrack, cameraTrack] = await createLocalTracks();
            
            // play local video track
            // localTracks.videoTrack.play("local-player");
            // $("#local-player-name").text(`localTrack(${options.uid})`);
            // publish local tracks to channel
            await client.publish([microphoneTrack, cameraTrack]);
            console.log("publish success");
        }

        // await client.publish([microphoneTrack, cameraTrack]);
        // window.client = client;
        // window.videoTrack = cameraTrack;
        // setJoinState(true);
    }

    async function leave() {
        if (localAudioTrack) {
            localAudioTrack.stop();
            localAudioTrack.close();
        }
        if (localVideoTrack) {
            localVideoTrack.stop();
            localVideoTrack.close();
        }

        setRemoteUsers([]);
        setJoinState(false);
        await (client === null || client === void 0 ? void 0 : client.leave());
    }
    
    const handleUserPublished = async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        // toggle rerender while state of remoteUsers changed.
        setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

    const handleUserUnpublished = (user) => {
        setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

    const handleUserJoined = (user) => {
        setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

    const handleUserLeft = (user) => {
        setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    };

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
        joinState,
        leave,
        join,
        remoteUsers,
    };

}