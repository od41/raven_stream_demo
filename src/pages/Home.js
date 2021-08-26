import { useState } from 'react';
import {
  VStack, Stack, Button, Heading, Text,
  Grid, Flex,
  Radio, RadioGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl, FormLabel, InputGroup, Input, useDisclosure, Portal, HStack, Box
} from '@chakra-ui/react'

import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Page from 'components/layout/Page';
import NavigationBar from 'components/layout/NavigationBar';

import { RightArrow } from 'components/icons/icons';

import appstore from 'media/appstore.png'
import googleplay from 'media/googleplay.png'
import phone from 'media/phone.png'

const DASHBOARD_URL = '/dashboard?channel=:channel&username=:username&role=:role'


export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    handleSubmit,
    register,
    // formState: { errors, isSubmitting, isSubmitSuccessful }
} = useForm();

const history = useHistory()

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

// index should default to the login page
  // if user is logged in go to overview page
  return (
    <>
      <Page>
      <NavigationBar loc="home" />
        <Grid templateColumns="40% 60%" h="80vh"  px="120px" mt="-100px">
          <VStack spacing="6" flexDir="column" justify="center" align="space-between" h="100%">
            <Heading as="h2" color="white.90" fontSize="60px" textAlign="left"> See the world,<br/> closer to you</Heading>
            <Text color="white.70" w="32rem" textAlign="left" fontSize="xl">Raven is a video live-streaming app that helps millions of creators publish and monetize live events and content anywhere in the world.</Text>

            <Box textAlign="left">
              <Button variant="raven_gradient" size="md"  rightIcon={<RightArrow />} onClick={onOpen} >Join Channel</Button>
            </Box>
            <HStack w="100%">
               <img width="130px" src={appstore} alt="download from the Apple playstore"/>
              <img width="130px" src={googleplay} alt="download from the Google playstore"/>
            </HStack>
          </VStack>
          <Box>
            <img src={phone} width="820px" alt="raven mobile app screenshot"/>
          </Box>
        </Grid>
        
      </Page>

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
                                                // isDisabled={true}
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
    </>)
}