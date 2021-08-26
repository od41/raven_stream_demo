// those how share the video and audio
// they publish their audio and video to the channel
// they can make other subscribers to be hosts


// createClient

// init

import {useState, useEffect} from 'react'

import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from '../hooks/useAgora';

import MediaPlayer from '../components/MediaPlayer'
import { Button, Heading } from '@chakra-ui/react';
import NavigationBar from './layout/NavigationBar';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'live' });
const APP_ID = process.env.REACT_APP_AGORA_ID
const APP_TOKEN = process.env.REACT_APP_AGORA_TOKEN

function Host({username, channel}) {

    const [ appid, setAppid ] = useState('');
    const [ token, setToken ] = useState('');
    const [ options, setOptions ] = useState({});

    const {
        localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers, shareScreen
    } = useAgora(client);

    const rejoin = () => {
        join(appid, channel, token, 'host', null)
    }

    const handleShareScreen = () => {
        shareScreen()
    }

    useEffect(async () => {
        setAppid(APP_ID)
        setToken(APP_TOKEN)

        setOptions({role: 'host', latency: 1}) // since wer'e in the host component, it can be hardcoded

        // start channel
        await join(appid, channel, token, 'host', null)
        
    }, [])

    useEffect(() => {
        console.log('remoteusers: ', remoteUsers)
    }, [client.remoteUsers])

    return (
        <>
            <NavigationBar />

            <Button id="leave" onClick={() => {leave()}}>Leave</Button>
            <Button id="rejoin" onClick={() => {rejoin()}}>Rejoin</Button>
            <Button id="shareScreen" onClick={() => {handleShareScreen()}}>Share Screen</Button>

            <div className='player-container'>
                <div className='local-player-wrapper'style={{border: '1px solid #000'}}>
                <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
                <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack}></MediaPlayer>
                </div>
                {client.remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
                    {/* <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p> */}
                    <p className='remote-player-text'>{`${user.uid} - ${username}`}</p>
                    <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                </div>))}
            </div>
            
        </>
    )
}

export default Host
