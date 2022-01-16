import { Box, Container, Flex, Spacer, Tab, Text, Icon, Tabs, TabList, TabPanels, Divider, Grid, TabPanel, useTheme, HStack, Input, useToast } from '@chakra-ui/react';
import React from 'react';
import { Nav } from '../../components/Nav';
import { getAllItems, getItem } from '../../frameworks/supabase/api/items';
import Image from 'next/image'
import { RiAuctionFill } from 'react-icons/ri'

import { dhm } from '../../utils';
import { auto_place_bid, create_bid } from '../../frameworks/supabase/api/bids';
import { supabase } from '../../frameworks/supabase';
import { useBids } from '../../frameworks/supabase/swr/use-bids';
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { useRouter } from 'next/router';
import { BidItem } from '../../components/BidItem';
import { useTimer } from 'react-timer-hook';


export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const res = await getAllItems()
    const items = res.data;

    // Get the paths we want to pre-render based on posts
    const paths = items.map((item) => ({
        params: { id: item.id.toString() },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}


export async function getStaticProps(context) {
    const { id } = context.params
    const res = await getItem(id)
    const data = res.data[0]

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data }, // will be passed to the page component as props
    }
}



export default function ItemPage({ data: _data }) {
    const router = useRouter()
    const user = supabase.auth.user()
    const session = supabase.auth.session()

    React.useEffect(() => {
        if (!user || !session) {
            router.push('/login')
        }
    }, [user, session, router])

    const theme = useTheme()
    const toast = useToast()
    const [data, setData] = React.useState(_data);
    const { data: bids, mutate: bidsMutate } = useBids(_data.id, user?.id)

    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer({ expiryTimestamp: new Date(_data?.close_bid), autoStart: true });


    React.useEffect(() => {
        const subcription = supabase
            .from('bids')
            .on('*', (payload) => {
                bidsMutate()
            })
            .subscribe((e) => console.log(e))

        return () => subcription.unsubscribe()
    }, [])



    const [bid, setBid] = React.useState(0);

    const onBid = async () => {
        let res = await create_bid({
            item: data.id,
            amount: bid,
            user_id: supabase.auth.user().id
        })

        if (!res.error) {
            toast({
                title: `Placed bid successfully!`,
                status: 'success',
                isClosable: true,
            })
        }
        else
            toast({
                title: res?.error?.message,
                status: 'error',
                isClosable: true,
            })
    }

    const onAutoBid = async () => {
        let res = await auto_place_bid({
            item: data.id,
            user_id: supabase.auth.user().id
        })

        if (!res.error) {
            toast({
                title: `Auto placed bid successfully!`,
                status: 'success',
                isClosable: true,
            })
        }
        else
            toast({
                title: res?.error?.message,
                status: 'error',
                isClosable: true,
            })
    }

    return <div>
        <Nav />
        <Container maxW='container.xl' >

            <Spacer h={'2em'} />
            <Box px='2em'>
                <Text fontSize={'4xl'}>{data?.label}</Text>
                <Text color='brand.600' fontSize={'xl'}>{data?.owner?.full_name}</Text>
            </Box>
            <Flex flexWrap={'wrap'}>
                <Box px='2em' my='1em' minHeight={500} w={['100%', '100%', '100%', '52%']} h='10'>
                    <Box borderRadius={'20px'} border={`2px solid ${theme.colors.brand['000']}`} boxShadow={`1px 1px 20px 0px ${theme.colors.brand['000']}`} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'} width={'100%'} height={'500px'}>
                        <Image objectFit='contain' layout='fill' src={data?.images[0]?.url} alt='' />
                    </Box>
                </Box>
                <Box px='1em' my='1em' w={['100%', '100%', '100%', '48%']} h='10'>

                    <Box boxShadow={`1px 1px 20px 0px ${theme.colors.brand['000']}`} width={'100%'} p='2em' borderRadius={'20px'} border={`2px solid ${theme.colors.brand['000']}`} >
                        <HStack width={'100%'} color='brand.400' justifyContent={'space-between'}>
                            <Text>Starting price: {data.min_bid}$</Text>
                            <Text>Buying price: {data.high_bid}$</Text>
                        </HStack>

                        <HStack width={'100%'} color='brand.250'>
                            <Icon color='brand.500' w={12} h={12} as={RiAuctionFill} />
                            <Divider orientation='vertical' />
                            <Box display={'block'}>
                                <Text fontWeight={'bold'} color='brand.500' fontSize={'2xl'}>{bids?.length ? bids[bids?.length - 1]?.amount : data?.min_bid}$</Text>
                                <Text>Current price</Text>
                            </Box>


                        </HStack>
                        <Text fontWeight={'bold'} color='brand.500' fontSize={'sm'}>Bid step: {data.step_bid}$</Text>
                        <Spacer h={2} />
                        {
                            data?.is_expired ? <Text color='brand.300' align={'center'}>Auction has finished</Text>
                                :

                                <HStack>
                                    <Input value={bid} onChange={e => setBid(e.target.valueAsNumber)} type={'number'} borderRadius={12} py='24px' placeholder='enter amount' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
                                    <Box
                                        onClick={onBid}
                                        as='button'
                                        width='100%'
                                        lineHeight='1'
                                        transition='0.4s ease'


                                        py='20px'
                                        borderRadius='20px'

                                        bg='brand.500'
                                        color={theme.colors.white}
                                        _hover={{ transition: '0.4s ease', bg: theme.colors.brand[400], }}
                                        _active={{
                                            transform: 'scale(0.98)',
                                            borderColor: theme.colors.brand[100],
                                        }}
                                        _focus={{

                                        }}
                                    >
                                        Bid
                                    </Box>
                                    <Divider height={'30px'} borderWidth={'1px'} borderColor={'brand.200'} orientation='vertical' />
                                    <Box
                                        onClick={onAutoBid}
                                        as='button'
                                        width='100%'
                                        lineHeight='1'
                                        transition='0.4s ease'

                                        py='20px'
                                        borderRadius='20px'

                                        bg='black'
                                        color={theme.colors.white}
                                        _hover={{ transition: '0.4s ease', bg: theme.colors.brand[800], }}
                                        _active={{
                                            transform: 'scale(0.98)',
                                            borderColor: theme.colors.brand[100],
                                        }}
                                        _focus={{

                                        }}
                                    >
                                        Auto Bid
                                    </Box>
                                </HStack>
                        }
                        <Text mt='2em' textAlign={'center'} fontSize={'xs'} color='brand.400'> Ending in {days} days, {hours} hours, {minutes} minutes, {seconds} seconds</Text>

                    </Box>
                    {/* -------------------------------------------------------------------------- */}
                    <Box my='1em' boxShadow={`1px 1px 20px 0px ${theme.colors.brand['000']}`} width={'100%'} p='1em' borderRadius={'20px'} border={`2px solid ${theme.colors.brand['000']}`} >
                        <Tabs width={'100%'} variant='soft-rounded' colorScheme='brand'>
                            <TabList mb='1em' alignItems={'flex-start'} >
                                <HStack>
                                    <Tab whiteSpace={'nowrap'} borderWidth={'1px'} color='brand.400' px='1em' py='0.5em' borderRadius={20} _focus={{}} _selected={{ borderWidth: "1px", color: 'white', bg: 'brand.600' }} >Info </Tab>
                                    <Tab whiteSpace={'nowrap'} borderWidth={'1px'} color='brand.400' px='1em' py='0.5em' borderRadius={20} _focus={{}} _selected={{ borderWidth: "1px", color: 'white', bg: 'brand.600' }}>History</Tab>
                                </HStack>


                            </TabList>
                            <Divider />
                            <TabPanels >
                                <TabPanel>
                                    <Text>{data.description}</Text>
                                </TabPanel>
                                <TabPanel>
                                    {bids?.map((item, id) => <BidItem key={id} data={item} />)}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>

            </Flex>
        </Container>

    </div>
}


