import React from 'react'
import { useLocation } from 'react-router-dom'

import {Box, Center, Heading, useBreakpointValue} from '@chakra-ui/react'
import gridLines from 'media/disco-lines.png'

function Page({children}) {
    const loc = useLocation()
    const isDesktop = useBreakpointValue({ base: false, xs: false, md: false, lg: false, xl: true })

    return (
        <Box overflowY="scroll" 
            bg={loc.pathname === "/" ? `url(${gridLines}), linear-gradient(180deg, #131313 0%, #1B1D2C 100%) ` : "color_codgray"} 
            color="white.90" 
            minH="100vh">
            {isDesktop ? children 
                :   
                    <Center align="center" h="100vh">
                        <Heading as="h3" fontSize="md">
                            Demo Application:<br/> Only
                            available on desktop.
                        </Heading>
                    </Center>
            }
        </Box>
    )
}

export default Page
