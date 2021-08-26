import { Avatar, Flex, Heading, VStack, Text, HStack, Icon, ListItem } from '@chakra-ui/react'
import {BsDot} from 'react-icons/bs'

function Message({message, index}) {

    const messageColor = index => {
        const colors = ['#F8B55D', '#5DF89B', '#DC7AFF']
        return colors[index % 3]
    }
    return (
        <ListItem my="2">
            <Flex w="100%">
                <Flex>
                    <Avatar src={message.sender.img} name={message.sender.name} size="sm"/>
                </Flex>
                <Flex spacing="2" bg={messageColor(index)} flexDir="column" ml="2" p="3" py="1.5" borderRadius="12px">
                    <Heading as="h5" fontSize="md" color="color_codgray"> {message.sender.name}</Heading>
                    <HStack spacing=".2">
                        <Text as="h5" fontSize="xs" color="color_codgray"> {message.sender.org}</Text>
                        <Icon as={BsDot} color="color_codgray" />
                        <Text fontSize="xs" color="color_codgray"> {message.timeStamp}</Text>
                    </HStack>

                    <Text fontSize="sm" color="color_codgray">
                        {message.text}
                    </Text>
                </Flex>

            </Flex>
        </ListItem>
    )
}

export default Message