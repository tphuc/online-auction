import { Box, Container, Divider, Grid, Menu, useToast, Textarea, Button, MenuItem, MenuList, Spacer, Text, Icon, MenuOptionGroup, MenuItemOption, Input, FormControl, Select } from '@chakra-ui/react';
import React from 'react';
import { Nav } from '../../components/Nav';
import { ProductCard } from '../../components/ProductCard';
import { RiArrowDownLine, RiArrowDropDownLine, RiAuctionLine, RiFile2Fill, RiFile2Line, RiUpload2Fill } from 'react-icons/ri'
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { FileUpload } from '../../components/FileUpload';
import { useForm } from 'react-hook-form';
import { createItem } from '../../frameworks/supabase/api/items';
import {useRouter} from 'next/router';
import { useItems } from '../../frameworks/supabase/swr/use-items';



export default function Discover() {
    const { data: categories } = useCategories();
    const { data: items} = useItems();
    const { register, handleSubmit } = useForm();
    const [isLoading, setLoading] = React.useState(false);
    const toast = useToast()
    const router = useRouter()
    const [filter, setFilter] = React.useState({
        category: ''
    })

    const onSubmit = async (data) => {
        setLoading(true)
        let res = await createItem(data);
        if(res.data){
            toast({
                title: `Add item success!`,
                status: 'success',
                isClosable: true,
            })
            router.push('/profile')
        }
        setLoading(false)
        
    }

    return <Box minHeight={'100vh'} >
        <Nav />

        <Container maxW='container.xl' centerContent>

            <Spacer h={'2em'} />
            <Spacer />


            <Box px='2em' width={'100%'}>
                <Text fontWeight={'bold'} color={'brand.600'} fontSize={'5xl'}>Create item to sell</Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isRequired>


                        <FileUpload
                            onChange={(e) => console.log(e)}
                            accept={'image/*'}
                            register={register('file')}
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
                        <Textarea color='brand.500' _focus={{borderColor:"brand.500"}} {...register('description')} placeholder='Product description' />
                        <Button isLoading={isLoading} type='submit' rightIcon={<Icon as={RiAuctionLine} />} size={'lg'} borderRadius={'14px'} colorScheme={'brand'} my='0.5em'> Auction </Button>

                    </FormControl>


                </form>

            </Box>

        </Container>
    </Box>
}