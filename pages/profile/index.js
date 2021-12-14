import { TabList, TabPanel, TabPanels, Tab, Tabs, useTheme, Container, VStack, HStack, Avatar, Text, Spacer, Box, Divider , Icon} from '@chakra-ui/react';
import React from 'react';
import { Nav } from '../../components/Nav';
import { RiHeart3Fill, RiHistoryFill, RiPriceTag3Fill, RiShoppingBag2Fill } from 'react-icons/ri'


export default function Profile() {
    const theme = useTheme()
    return <div>
        <Nav />
        <Container  mx={0} maxW='100vw' centerContent>
        <Spacer h={'2em'}/>
            <Avatar bg='brand.700' name='Felix Tran' size={'xl'}/>
            <Text fontSize={'xl'}>Username</Text>
            <Spacer h={'2em'}/>
        <Tabs  variant='soft-rounded'   colorScheme='brand'>
            <TabList py='1em' >
                <Box display={'flex'} overflowX='scroll' maxW={'100vw'}>
                <Tab px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{border:`none`}} _selected={{   border:"none", color: 'white', bg: 'brand.600' }} >Listing <Icon ml={'0.5em'} as={RiPriceTag3Fill}/></Tab>
                <Tab px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{border:`none`}} _selected={{   border:"none", color: 'white', bg: 'brand.600' }}>Watchlist <Icon ml={'0.5em'} as={RiHeart3Fill}/> </Tab>
                <Tab px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{border:`none`}} _selected={{   border:"none", color: 'white', bg: 'brand.600' }}>Activity <Icon ml={'0.5em'} as={RiHistoryFill}/></Tab>
                <Tab px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{border:`none`}} _selected={{   border:"none", color: 'white', bg: 'brand.600' }}>Bought <Icon ml={'0.5em'} as={RiShoppingBag2Fill}/> </Tab>
               
                </Box>
                
            </TabList>
            <Divider/>
            <TabPanels>
                <TabPanel>
                    <p>one!</p>
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
        </Container>
    </div>
}