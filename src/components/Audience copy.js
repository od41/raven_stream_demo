// those who watch the content of the subscriber
// it shows their name
// they can post comments, raise their hands and interact on the channel
// play remote video and audio track

import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from 'hooks/useAgora';
import MediaPlayer from 'components/MediaPlayer'

import NavigationBar from 'components/layout/NavigationBar';

import {useState, useEffect} from 'react'
import { Heading, Text, Icon, Select, Button, Box, Flex, Grid, Badge, HStack, Divider, Input, IconButton, VStack, UnorderedList } from '@chakra-ui/react'
import Page from 'components/layout/Page';
import Message from 'components/message/Message';
import ShadowScroll from 'components/layout/ShadowScroll';

import { LeftArrow, Feed, People, Messages, Alerts, Hand, Emoji } from "components/icons/icons";
import broadcastBackground from 'media/broadcast_background_1.jpg'

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'live' });
const APP_ID = process.env.REACT_APP_AGORA_ID
const APP_TOKEN = process.env.REACT_APP_AGORA_TOKEN

const rtmChatMessages = [
    {
        sender: {
            name: 'Jon Do',
            org: 'Raven',
        },
        timeStamp: `${new Date().getUTCSeconds()} seconds` ,
        text: 'Bla, bla bla. La, lalalalalalla.'
    }, 
    {
        sender: {
            name: 'Jon Do',
            org: 'YouTube',
        },
        timeStamp: `${new Date().getUTCSeconds()} seconds` ,
        text: 'Bla, bla bla. La, lalalalalalla.'
    },
    {
        sender: {
            name: 'Jon Do',
            org: 'Canva',
        },
        timeStamp: `${new Date().getUTCSeconds()} seconds` ,
        text: 'Bla, bla bla. La, lalalalalalla.'
    },
    {
        sender: {
            name: 'Jon Do',
            org: 'NNPC',
        },
        timeStamp: `${new Date().getUTCSeconds()} seconds` ,
        text: 'Bla, bla bla. La, lalalalalalla.'
    },
    {
        sender: {
            name: 'Jon Do',
            org: 'Nigerian Breweries',
        },
        timeStamp: `${new Date().getUTCSeconds()} seconds` ,
        text: 'Bla, bla bla. La, lalalalalalla.'
    },
    {
        sender: {
            name: 'Jon Do',
            org: 'Globacom',
        },
        timeStamp: `${new Date().getUTCSeconds()} seconds` ,
        text: 'Bla, bla bla. La, lalalalalalla.'
    },
    {
        sender: {
            name: 'Jon Do',
            org: 'Amazon',
        },
        timeStamp: `${new Date().getUTCSeconds()} seconds` ,
        text: 'Bla, bla bla. La, lalalalalalla. Bla, bla bla. La, lalalalalalla.'
    },
]

function StreamDashboard({username, channel}) {

    
    const [ appid, setAppid ] = useState('');
    const [ token, setToken ] = useState('');
    const [ options, setOptions ] = useState({});

    const {
        remoteAudioTrack, remoteVideoTrack, leave, join, joinState, remoteUsers
    } = useAgora(client);

    let haveJoined

    const rejoin = () => {
        leave()
        join(appid, channel, token, 'audience', null)
    }
    
    const raiseHand = () => {
        console.log(`${username} raised their hand`)
    }

    useEffect(async () => {
        setAppid(APP_ID)
        setToken(APP_TOKEN)

        setOptions({role: 'audience', latency: 1}) // since wer'e in the host component, it can be hardcoded

        // start channel
        await join(APP_ID, channel, token, 'audience', null)
        
    }, [haveJoined])

    useEffect(() => {
        console.log('remoteusers: ', remoteUsers)
    }, [client.remoteUsers])

    
    return (
        <>
            <Page>

                <NavigationBar />

                <Grid templateColumns="auto 400px"  h="76vh" mt="1.9rem" alignSelf="center" mx="6">
                    <Flex flexDir="column" h="100%" w="100%"  justify="space-between" borderLeftRadius="8px" bg={'yellow'}
                        background={`url(${broadcastBackground})`} backgroundRepeat="no-repeat" backgroundSize="cover"
                    >
                         <Flex justify="space-between" px="6" mb="4" align="center" mt="4">
                            <HStack spacing="3" bg="color_codgray" px="3" py="2" borderRadius="4px" w="auto" >
                                {joinState ? <Badge align="center" fontSize="x-small" bg="raven_red" color="white">LIVE</Badge>
                                : <Badge align="center" fontSize="x-small" bg="gray" color="white">NOT LIVE</Badge> }
                                
                                <Text fontSize="xs">1:03:34</Text>
                                <Badge fontSize="x-small"><Icon as={People} />323</Badge>
                            </HStack>

                            <HStack >
                                <Select 
                                    // placeholder="Select Quality" 
                                    defaultValue="sd"
                                    size="sm" fontSize="xs"  py="2" variant="dark_1" w="auto">
                                    <option value="4k">4K</option>
                                    <option value="hd">HD</option>
                                    <option value="sd" >SD</option>
                                </Select>
                            <Button id="help" variant="dark_1" size="sm" px="3" py="2" fontSize="xs" onClick={() => console.log('help')}>Facing Problems?</Button>

                            </HStack>
                         </Flex>

                         <Flex align="center" justify="center" w="100%" h="100%" px={['6', '6', '6', '8rem']}>
                            <MediaPlayer width="100%" height={["70%", "90%"]} videoTrack={remoteVideoTrack} audioTrack={remoteAudioTrack}></MediaPlayer>
                         </Flex>
                       
                        
                        <Flex justify="space-between" px="6" mb="4" mt="4" align="center">
                            
                        <HStack> 
                            <HStack spacing="3" bg="color_codgray" px="2" py="1" borderRadius="4px">
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>👏</Text>
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>💖</Text>
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>👍</Text>
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>😎</Text>
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>🤣</Text>
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>🎉</Text>
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>🏆</Text>
                                <Text _hover={{cursor: 'pointer', transform: 'scale(1.3)'}}>🙌</Text>

                                
                            </HStack>
                            
                                <Button id="shareScreen" leftIcon={<Hand />} px="3" py="2" fontSize="xs" size="sm" onClick={() => {raiseHand()}}
                                        size="sm" variant="dark_1"
                                >Raise Hand</Button>
                            </HStack>

                            <HStack>
                                <Button id="rejoin" variant="dark_1" px="3" py="2" fontSize="xs" size="sm" onClick={() => {rejoin()}}>Rejoin</Button>
                                <Button id="leave" variant="dark_1" px="3" py="2" fontSize="xs" size="sm" bg="red" onClick={() => {leave()}}>Leave</Button>
                            </HStack>
                        </Flex>
                        
                    </Flex>

                    <Flex bg="color_shark" borderRightRadius="8px" h="100%">
                        

                        <Grid gridTemplateRows="72px auto 92px" w="100%">
                            {/* heading */}
                            <Box borderBottom="0.75px solid" borderBottomColor="white.20" >
                                <Heading as="h5" fontSize="xl" fontWeight="medium" px="24px" py="24px" color="white.90">Coversation History</Heading>
                            </Box>
                            {/* chat messages box */}
                            <VStack w="100%" px="16px" maxH="441px" borderBottom="0.75px solid" borderBottomColor="white.20">
                                <ShadowScroll isShadow={true} scrollWidth={10} scrollPadding={5}>
                                    <UnorderedList listStyleType="none">
                                        {rtmChatMessages.map((message, index) => {
                                            return <Message key={index} message={message} index={index} />
                                        }
                                        )}
                                    </UnorderedList>

                                </ShadowScroll>
                            </VStack>
                            {/* chat text box */}
                            <Flex w="100%" px="16px" align="center">
                                <Input placeholder="Send message" variant="dark_1" />
                                <IconButton icon={<Emoji />} size="sm" bg="none" />
                            </Flex>

                        </Grid>

                        
                        {/* {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
                        <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
                        <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
                    </div>))} */}
                    </Flex>

                </Grid>
            </Page>
        </>
    )
}

export default StreamDashboard
