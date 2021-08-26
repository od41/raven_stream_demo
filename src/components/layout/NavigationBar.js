import { useEffect, useState } from "react";

import { Span, Avatar, Icon, Stack, Flex, Text, Button, Heading, VStack, Box, Menu, MenuButton, MenuList, MenuItem, Link, Divider, Image, IconButton, HStack, Badge,
    Radio, RadioGroup,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl, FormLabel, InputGroup, Input, useDisclosure, Portal, 
} from "@chakra-ui/react";

import { useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';

import { Link as ReactLink, useLocation } from 'react-router-dom'
import { BiBell, BiUserCircle, BiLogOut, BiLeftArrowAlt } from "react-icons/bi";

import logo from 'media/logo.png'
import logoFull from 'media/logo-full.png'

import { LeftArrow, Feed, People, Messages, Alerts, RightArrow } from "components/icons/icons";

const DASHBOARD_URL = '/dashboard?channel=:channel&username=:username&role=:role'

export default function NavigationBar(props) {
    const {loc} = props
    const location = useLocation()
    const history = useHistory()

    // Change the document title in the browser tab
    useEffect(() => {
        if(loc === 'home'){
            document.title = 'Raven Livestream'
        } else {
            document.title = "Dashboard"
        }
    }, [])


    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        handleSubmit,
        register,
        // formState: { errors, isSubmitting, isSubmitSuccessful }
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data)
        return new Promise((resolve) => {
            setTimeout(() => {
                history.push(DASHBOARD_URL.replace(':channel&username=:username&role=:role', `${data.channel}&username=${data.username}&role=${data.role}`))
                // alert(JSON.stringify(data, null, 2));
                resolve();
            }, 1000);
        });
      }

    return (
        <>
            <Flex
                // pos="fixed"
                left="0"
                top="0"
                px={loc === 'home' ? "120px" : "6"}
                h="90px"
                boxShadow={loc === 'home' ? null : "0 4px 12px 0 rgba(0, 0, 0, 0.05)"}
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                bgColor={loc === 'home' ? "transparent" : "color_shark"}
                zIndex="100"
                color="#fff"
            // display={{ base: 'none', md: 'flex' }}
            >
                {/* Logo on the left side */}
                <Flex align='center' w={loc === "home" ? "25%" : ""}>
                    <Link as={ReactLink} to="/">
                        <Box>
                            <Image src={loc === 'home' ? logoFull : logo} width={loc === 'home' ? "233px" : "52px"} height={loc === 'home' ? "auto" : "50px"} alt="Raven logo" />
                        </Box>
                    </Link>
                    {loc === 'home' ? null : 
                        <>
                            <IconButton ml="32px" icon={<LeftArrow />} background="none" color="#fff" _hover={{backgroundColor: 'none', color: 'inherit'}} onClick={()=> history.push('/')} />
                            <Heading as="h5" size="md" fontWeight="medium" w="240px" ml="10px" colour="">Live Session</Heading>
                        </>
                    }

                </Flex>
                
                {loc === 'home' ? <>
                    <HStack
                        alignItems="center"
                        w="50%"
                        maxW="600px"
                        justifyContent="center"
                        spacing="9"
                    >
                        <Link as={ReactLink} to="#">
                            <Text fontSize="md" textAlign="center" color="white.80">About Us</Text>
                        </Link>
                        <Link as={ReactLink} to="#">
                            <Text fontSize="md" textAlign="center" color="white.80">Contact</Text>
                        </Link>
                        <Link as={ReactLink} to="#">
                            <Text fontSize="md" textAlign="center" color="white.80">Shop</Text>
                        </Link>
                        <Link as={ReactLink} to="#">
                            <HStack spacing="0" justify="center" spacing="1">
                                <Text fontSize="md" textAlign="center" color="white.80">Tournaments</Text>
                                <Badge
                                    bg="linear-gradient(265.86deg, #D68B2F 8.45%, #FBB961 101.33%)"
                                    _hover={""}
                                    fontSize="8px"
                                    px="2px"
                                    py=".1px"
                                    textTransform="uppercase"
                                    
                                    >New</Badge>
                            </HStack>
                        </Link>
                    </HStack>
                </> : 
                    <HStack
                    alignItems="center"
                    w="70%"
                    maxW="600px"
                    justifyContent="flex-end"
                    spacing="9"
                >
                    <Link as={ReactLink} to="#">
                        <VStack spacing="0" justify="center">
                            <Icon
                                bg=""
                                boxSize="26px"
                                _hover={""}
                                as={Feed}
                                />
                                <Text fontSize="xs" textAlign="center" color="white.80">Feed</Text>
                        </VStack>
                    </Link>

                    <Link as={ReactLink} to="#">
                        <VStack spacing="0" justify="center">
                            <Icon
                                bg=""
                                boxSize="26px"
                                _hover={""}
                                as={People}
                                />
                                <Text fontSize="xs" textAlign="center" color="white.80">People</Text>
                        </VStack>
                    </Link>

                    <Link as={ReactLink} to="#">
                        <VStack spacing="0" justify="center">
                            <Icon
                                bg=""
                                boxSize="26px"
                                _hover={""}
                                as={Messages}
                                />
                                <Text fontSize="xs" textAlign="center" color="white.80">Messages</Text>
                        </VStack>
                    </Link>

                    <Box >
                        <Menu placement='bottom-end'>
                            <MenuButton>
                                <VStack spacing="0" justify="center">
                                    <Icon
                                        bg=""
                                        boxSize="26px"
                                        _hover={""}
                                        as={Alerts}
                                        />
                                        <Text fontSize="xs" textAlign="center" color="white.80">Alerts</Text>
                                </VStack>
                            </MenuButton>
                            <MenuList>
                                <Flex w="450px" justifyContent="space-between" px="20px" mt="20px" mb="15px" align="center">
                                    <Text as="h5" color="" fontWeight="semibold" fontSize="lg"> Notifications</Text>
                                    
                                    <Link
                                        as={ReactLink}
                                        to='#'
                                        backgroundColor=""
                                        px="4px"
                                        pr="10px"
                                        py='3px'
                                        borderRadius={8}
                                        _hover={{ background: '' }}
                                        _pressed={{ color: '' }}
                                    >
                                        <Flex alignItems="center">
                                            <Text
                                                ml={2}
                                                color=''
                                                fontWeight="medium"
                                                fontSize="sm"
                                            >View all notifications</Text>
                                        </Flex>
                                    </Link>
                                    {/* </NextLink> */}
                                </Flex>

                                <VStack spacing={2}>
                                    <Divider w="91%" align="center" />
                                    <MenuItem>
                                        <Flex justifyContent="space-between" align="center" px={{ base: "8px", lg: "15px" }}>
                                            <Text
                                                ml="6px"
                                                width={{ base: "90%", lg: "75%" }}
                                                maxWidth={{ base: "250px", lg: "350px"}}
                                                fontSize="sm"
                                                isTruncated
                                            >Notification</Text>
                                            <Text
                                                as={Span}
                                                display={["block", "block", "inline-block"]}
                                                ml="6px"
                                                fontSize="xs"
                                            >10:45</Text>
                                        </Flex>
                                </MenuItem>

                                <MenuItem>
                                        <Flex justifyContent="space-between" align="center" px={{ base: "8px", lg: "15px" }}>
                                            <Text
                                                ml="6px"
                                                width={{ base: "90%", lg: "75%" }}
                                                maxWidth={{ base: "250px", lg: "350px"}}
                                                fontSize="sm"
                                                isTruncated
                                            >Notification</Text>
                                            <Text
                                                as={Span}
                                                display={["block", "block", "inline-block"]}
                                                ml="6px"
                                                fontSize="xs"
                                            >10:45</Text>
                                        </Flex>
                                </MenuItem>

                                <MenuItem>
                                        <Flex justifyContent="space-between" align="center" px={{ base: "8px", lg: "15px" }}>
                                            <Text
                                                ml="6px"
                                                width={{ base: "90%", lg: "75%" }}
                                                maxWidth={{ base: "250px", lg: "350px"}}
                                                fontSize="sm"
                                                isTruncated
                                            >Notification</Text>
                                            <Text
                                                as={Span}
                                                display={["block", "block", "inline-block"]}
                                                ml="6px"
                                                fontSize="xs"
                                            >10:45</Text>
                                        </Flex>
                                </MenuItem>
                                </VStack>
                            </MenuList>

                        </Menu>
                    </Box>


                    <Box ml="12px">
                        <Menu>
                            <MenuButton>
                                    <VStack spacing="0" justify="center">
                                        <Avatar src={''} name={''} size="sm"/>
                                        <Text fontSize="xs" textAlign="center" color="white.80">Isaac</Text>
                                    </VStack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link as={ReactLink} to={'#'}>
                                        <Flex alignItems="center">
                                            <Icon
                                                as={BiUserCircle}
                                                boxSize='20px'
                                                color=''
                                            />
                                            <Text
                                                ml={2}
                                                color=''
                                                fontWeight="medium"
                                            >Profile</Text>
                                        </Flex>
                                    </Link>
                                    {/* </NextLink> */}
                                </MenuItem>
                                <MenuItem>
                                    {/* <NextLink href={'/customer/login'} passHref > */}
                                    <Link as={ReactLink} to="/login">
                                        <Flex alignItems="center">
                                            <Icon
                                                as={BiLogOut}
                                                boxSize='20px'
                                                color=''
                                            />
                                            <Text
                                                ml={2}
                                                color=''
                                                fontWeight="medium"
                                            >Log out</Text>
                                        </Flex>
                                    </Link>
                                    {/* </NextLink> */}
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </HStack>
                }

                {loc === 'home' ? <>
                    <HStack
                        alignItems="center"
                        w="25%"
                        maxW="600px"
                        justifyContent="flex-end"
                        spacing="3"
                    >
                        <Button fontSize="sm" textAlign="center" variant="dark_1" color="white.80">Login</Button>
                        <Button fontSize="sm" textAlign="center" variant="raven_gradient" rightIcon={<RightArrow />} onClick={onOpen}>Join Channel</Button>
                        
                    </HStack>
                </> : null }
            </Flex>

            <Portal>
        {/* begin modal */}
        <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose} isCentered={[true, false]} size="xs">
                <ModalOverlay />
                <ModalContent mx={[4, null]} bg="color_shark" color="white.90">
                    <form >
                        <ModalHeader><Heading  as="h4" fontSize="22px" fontWeight="medium">Join Channel</Heading></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody >


                            <VStack spacing={4} >
                                    {/* input element */}
                                    <FormControl>
                                        <FormLabel color="white.50" textTransform="uppercase" fontSize="xs">Username</FormLabel>
                                        <InputGroup size="md">
                                            {/* <InputLeftElement children={<BiUserCircle />} color="''" /> */}
                                            <Input
                                              {...register('username', {required: 'Username is required'})}
                                              fontSize="sm"
                                              type="text"
                                              variant="flushed"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    {/* an input element */}
                                    <FormControl>
                                        <FormLabel color="white.50" textTransform="uppercase" fontSize="xs">Channel</FormLabel>
                                        <InputGroup size="md">
                                            {/* <InputLeftElement children={<BiUserCircle />} color="''" /> */}
                                            <Input
                                                {...register('channel')}
                                                fontSize="sm"
                                                type="text"
                                                variant="flushed"
                                                value="public"
                                            />
                                        </InputGroup>
                                    </FormControl>

                                    {/* Radio input */}
                                    <FormControl >
                                      <FormLabel  fontSize="md">
                                        Are you the host?
                                      </FormLabel>
                                      <RadioGroup
                                        defaultValue="host"
                                      >
                                        <Stack spacing={4} direction="column">
                                          {/* host */}
                                          <Radio
                                            name="viewer_type"
                                            size="md"
                                            value="host"
                                            {...register('role')}
                                          >
                                            <Text fontSize="xs" color="">
                                              Yes
                                            </Text>
                                          </Radio>
                                          {/* audience */}
                                          <Radio
                                            name="viewer_type"
                                            size="md"
                                            value="audience"
                                            {...register('role')}
                                          >
                                            <Text fontSize="xs" color="">
                                              No
                                            </Text>
                                          </Radio>
                                        </Stack>
                                      </RadioGroup>
                                    </FormControl>
                            </VStack>


                        </ModalBody>

                        <ModalFooter>
                            <Button variant="unstyled" fontWeight="medium" mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button
                                variant="raven_gradient"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Join Channel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            {/* end modal */}
      </Portal>
        </>

    )
}
