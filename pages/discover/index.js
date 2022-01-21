import { Box, Container, Divider, Grid, Menu, MenuButton, Button, MenuItem, MenuList, Spacer, Text, Icon, MenuOptionGroup, MenuItemOption, Select, Input, Spinner, useToast } from '@chakra-ui/react';
import React from 'react';
import { Nav } from '../../components/Nav';
import { ProductCard } from '../../components/ProductCard';
import { RiArrowDownLine, RiArrowDropDownLine, RiHeart3Fill } from 'react-icons/ri'
import { useCategories } from '../../frameworks/supabase/swr/use-categories';
import { useItems } from '../../frameworks/supabase/swr/use-items';
import { Pagination } from '../../components/Pagination';
import { MAX_ITEMS_PER_PAGE } from '../../config';
import { WishlistAPI } from '../../frameworks/supabase/api/wishlists';
import { supabase } from '../../frameworks/supabase';


export default function Discover() {
    const { data: categories } = useCategories();

  

    const [filter, setFilter] = React.useState({
        sort: '',
        category: '',
        label: '',
        page: 1
    })

    const toast = useToast();

    const { data: items, isLoading, count } = useItems(filter);

    const addToWishlist = async (item) => {
        const user = supabase.auth.user();
        if(!user){
            toast({
                title: `Please sign in first`,
                isClosable: true,
            })
            return;
        }
        const { data, error } = await WishlistAPI.addToWishlist({
            item: item?.id,
            user: user?.id
        })
        if(!error){
            toast({
                title: `Added to wishlist`,
                status: 'success',
                isClosable: true,
            })
        }
        else {
            toast({
                title: 'Already in wishlist',
                status: 'error',
                isClosable: true,
            })
        }
    }


    return <Box minHeight={'100vh'} >
        <Nav />

        <Container maxW='container.xl' centerContent>

            <Spacer h={'2em'} />
            <Spacer />
            <Box px='2em' width={'100%'}>
                <Text fontWeight={'bold'} color={'brand.700'} fontSize={'5xl'}>Discover</Text>
                <Box maxWidth={'100vw'} justifyContent={'flex-start'}  display={'inline-flex'} alignItems={'center'}>
                    <Select  display={'inline-block'} color='brand.500' colorScheme={'brand'} borderRadius={'14px'} my='0.5em' onChange={(e) => setFilter({ ...filter, category: e.target.value })} value={filter.category} bg={'brand.000'} borderWidth={0} _hover={{ background: "brand.100" }} variant={'filled'} placeholder='Select category'>
                        {categories?.map((item, id) => <option key={id} value={item.id}>{item.label}</option>)}
                        <option value={''}>all</option>
                    </Select>
                    <Select ml='1em'  display={'inline-block'} color='brand.500' colorScheme={'brand'} borderRadius={'14px'} my='0.5em' onChange={(e) => setFilter({ ...filter, sort: e.target.value })} value={filter.sort} bg={'brand.000'} borderWidth={0} _hover={{ background: "brand.100" }} variant={'filled'} placeholder='Sorted by'>
                        <option value={'min_bid'}>Price low to high</option>
                        <option value={'close_bid'}>Ending time</option>
                    </Select>
                    <Input ml='2em' onKeyDown={(e) => {
                    if (e.key == 'Enter') {
                        setFilter({...filter, label:e.target.value})
                    }
                }} onBlur={(e) => setFilter({...filter, label:e.target.value})}  type={'text'} borderRadius={12} py='20px' placeholder='search product name' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
                </Box>

                <Spacer h={5} />
                <Grid templateColumns='repeat(auto-fill, minmax(250px,1fr ))' columnGap={'2em'} rowGap={'2em'}>
                    {items?.map((item, id) => <Box display={'flex'} justifyContent={"center"} alignItems={"center"} key={item?.id} width={'100%'}>
                        <ProductCard actionIcon={<RiHeart3Fill/>} onActionClick={() => addToWishlist(item)} data={item} />
                    </Box>)}

                </Grid>
            </Box>
            {isLoading && <Spinner/>}
            <Spacer h={5} />
            <Pagination currentPage={filter.page} onPageChange={(page) => { setFilter({...filter, page}) }} maxPage={ Math.floor(count / MAX_ITEMS_PER_PAGE) + 1 } />
        </Container>
    </Box>
}