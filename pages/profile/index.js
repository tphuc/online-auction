import { TabList, TabPanel, TabPanels, Tab, Tabs, useTheme, Container, VStack, Grid, Avatar, Text, Spacer, Box, Divider, Icon, Button, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, Select, Input, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Nav } from '../../components/Nav';
import { RiAddBoxLine, RiCheckboxBlankLine, RiCheckboxCircleFill, RiCheckboxCircleLine, RiHeart3Fill, RiHistoryFill, RiPriceTag3Fill, RiShoppingBag2Fill, RiUpload2Fill } from 'react-icons/ri'
import { supabase } from '../../frameworks/supabase';
import { useRouter } from 'next/router'
import { useUser } from '../../frameworks/supabase/swr/use-user';
import { updateUser } from '../../frameworks/supabase/api/users';
import { useUserOnsale } from '../../frameworks/supabase/swr/use-user-onsale';
import { ProductCard } from '../../components/ProductCard';
import { useUserBids } from '../../frameworks/supabase/swr/use-user-bids';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useUserInventory } from '../../frameworks/supabase/swr/use-user-inventory';
import { FileUpload } from '../../components/FileUpload';
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { createItem } from '../../frameworks/supabase/api/items';
import { useUserWishlist } from '../../frameworks/supabase/swr/use-wishlist';
import dynamic from 'next/dynamic'

const JoditEditor = dynamic(() => import('jodit-react'), {ssr: false})

export default function Profile({ }) {
    const theme = useTheme()
    const toast = useToast()
    const router = useRouter()
    const auth = supabase.auth.user()
    const { data: categories } = useCategories();
    const { data: user, mutate } = useUser(auth?.id)
    const { data: onSaleItems, mutate: saleMutate } = useUserOnsale(auth?.id)
    const { data: inventoryItems } = useUserInventory(auth?.id);
    const { data: wishlistItems } = useUserWishlist(auth?.id);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { data: bidHistory } = useUserBids(auth?.id)
    const [isLoading, setLoading] = React.useState(false);

    const {
        reset,
        getValues,
        setValue,
        register,
        handleSubmit,
    } = useForm();


    const requestUpgradeSeller = async () => {
        let res = await updateUser({
            upgrade_seller: true
        })
        if (!res.error) {
            toast({
                title: 'Request upgrade to Seller submited!',
                status: 'success'
            })
            mutate()
        }
    }

    const onSubmit = async (data) => {
        setLoading(true)


        let res = await createItem(data);

        if (!res.error) {
            toast({
                title: `Add item success!`,
                status: 'success',
                isClosable: true,
            })
            reset();
            saleMutate();
            onClose()
        }

        setLoading(false)

    }


    return <div>
        <Nav />
        <Container mx={0} px={0} maxW='100vw' centerContent>
            <Spacer h={'2em'} />
            <Avatar bg='brand.100' color='brand.500' name={user?.full_name} size={'md'} />
            <Text color='brand.700' fontSize={'xl'}>{user?.full_name}</Text>
            <Spacer h={'1em'} />
            {
                !user?.seller && <Box onClick={() => {
                    if (!user.upgrade_seller) {
                        requestUpgradeSeller()
                    }
                }} cursor={'pointer'} bg='brand.000' display={'flex'} alignItems={'center'} color='brand.500' px='1em' py='3px' borderRadius={'12px'}>
                    <Text fontSize={'sm'} as='span'>Request upgrade to seller</Text>
                    <Icon ml='0.5em' as={user?.upgrade_seller ? RiCheckboxCircleFill : RiCheckboxCircleLine}></Icon>
                </Box>
            }

            {user?.upgrade_seller && <Text my='2px' fontSize={'sm'} color='brand.300' textAlign={'center'}>Waiting for approval!</Text>}
            {user?.seller && <Box onClick={() => {
                onOpen()
            }} cursor={'pointer'} bg='brand.000' display={'flex'} alignItems={'center'} color='brand.500' px='1em' py='3px' borderRadius={'12px'}>
                <Text fontSize={'sm'} as='span'>Create auction item</Text>
                <Icon ml='0.5em' as={RiAddBoxLine}></Icon>
            </Box>}
            <Spacer h={'2em'} />
            <Tabs width={'100%'} variant='soft-rounded' colorScheme='brand'>
                <TabList py='1em' >
                    <Box margin={'0px auto'} display={'flex'} overflowX='scroll' maxW={'100vw'}>
                        <Tab whiteSpace={'nowrap'} color='brand.400' px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{ border: `none` }} _selected={{ border: "none", color: 'white', bg: 'brand.600' }} >On sale <Icon ml={'0.5em'} as={RiPriceTag3Fill} /></Tab>
                        <Tab whiteSpace={'nowrap'} color='brand.400' px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{ border: `none` }} _selected={{ border: "none", color: 'white', bg: 'brand.600' }}>Items <Icon ml={'0.5em'} as={RiShoppingBag2Fill} /> </Tab>
                        <Tab whiteSpace={'nowrap'} color='brand.400' px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{ border: `none` }} _selected={{ border: "none", color: 'white', bg: 'brand.600' }}>Watchlist <Icon ml={'0.5em'} as={RiHeart3Fill} /> </Tab>
                        <Tab whiteSpace={'nowrap'} color='brand.400' px='2em' mx='0.5em' py='1em' borderRadius={20} _focus={{ border: `none` }} _selected={{ border: "none", color: 'white', bg: 'brand.600' }}>Activity <Icon ml={'0.5em'} as={RiHistoryFill} /></Tab>
                    </Box>

                </TabList>
                <Divider />
                <TabPanels minHeight={'60vh'} >
                    <TabPanel>
                        <Grid templateColumns='repeat(auto-fill, minmax(320px,1fr ))' columnGap={'2em'} rowGap={'2em'}>
                            {onSaleItems?.map((item, id) => <Box display={'flex'} justifyContent={"center"} alignItems={"center"} key={id} width={'100%'}>
                                <ProductCard data={item} />
                            </Box>)}
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Grid templateColumns='repeat(auto-fill, minmax(320px,1fr ))' columnGap={'2em'} rowGap={'2em'}>
                            {inventoryItems?.map((item, id) => <Box display={'flex'} justifyContent={"center"} alignItems={"center"} key={id} width={'100%'}>
                                <ProductCard data={item} />
                            </Box>)}
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                    <Grid templateColumns='repeat(auto-fill, minmax(320px,1fr ))' columnGap={'2em'} rowGap={'2em'}>
                            {wishlistItems?.map((item, id) => <Box display={'flex'} justifyContent={"center"} alignItems={"center"} key={id} width={'100%'}>
                                <ProductCard data={item?.item} />
                            </Box>)}
                        </Grid>
                    </TabPanel>
                    <TabPanel>
                        <Container centerContent maxW='md'>
                            {
                                bidHistory?.map((item, id) => <Box my='5px' width={'100%'} key={id} border={`1px solid`} borderColor={`brand.000`} px='1em' py='0.5em' borderRadius={8}>
                                    <Text color='gray.600' fontSize={'sm'} textTransform={'uppercase'}>{new Date(item?.created_at).toLocaleString()}</Text>
                                    <Text noOfLines={1}>
                                        <Text as='span' color='brand.400'> you </Text> offered
                                        <Link passHref href={`/item/${item?.items?.id}`}>
                                            <Text cursor={'pointer'} decoration={'underline'} as='span' color='brand.450'> {item?.items?.label} </Text>
                                        </Link>
                                        for <Text as='span' color='brand.400'>{item.amount}$</Text>
                                    </Text>
                                </Box>)
                            }
                        </Container>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent px='1em'>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired>
                        <FileUpload

                            multiple
                            accept={'image/*'}
                            register={register('file', {required: true})}
                        >
                            <Button  borderRadius={'14px'} color='brand.500' bg='brand.000' leftIcon={<Icon as={RiUpload2Fill} />}>
                                Upload
                            </Button>
                        </FileUpload>
                        <Select color='brand.500' colorScheme={'brand'} borderRadius={'14px'} my='0.5em' {...register('category')} bg={'brand.000'} borderWidth={0} _hover={{background:"brand.50"}} variant={'filled'} placeholder='Select category'>
                            {categories?.map((item,id) => <option  key={id} value={item.id}>{item.label}</option>)}
                        </Select>
                        <Input color='brand.500' display={'block'} my='0.5em'  {...register('label')} borderRadius={12} placeholder='Product name' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
                        <Input color='brand.500' display={'block'} my='0.5em'  {...register('min_bid')} type='number' borderRadius={12} placeholder='Min bid' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
                        <Input color='brand.500' display={'block'} my='0.5em'  {...register('high_bid')} type='number' borderRadius={12} placeholder='Max bid' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
                        <Input color='brand.500' display={'block'} my='0.5em'  {...register('step_bid')} type='number' borderRadius={12} placeholder='Bid step' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
                        <Input color='brand.500' display={'block'} my='0.5em'  {...register('close_bid')} type='datetime-local' borderRadius={12} placeholder='End date' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
                        <JoditEditor

                            value={getValues('description')}
                            tabIndex={1} // tabIndex of textarea
                            onBlur={newContent => setValue('description', newContent)} // preferred to use only this option to update the content for performance reasons

            />
                        {/* <Textarea color='brand.500' _focus={{borderColor:"brand.500"}} {...register('description')} placeholder='Product description' /> */}
                        <Button isLoading={isLoading}  my='1em' colorScheme={'brand'} type='submit' >submit</Button>
                    </FormControl>
                </form>



            </ModalContent>
        </Modal>
    </div>
}
