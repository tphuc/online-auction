import { Box, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';


export function Pagination({currentPage=1, onPageChange = (page) => {}, maxPage = 10 }){
    console.log(maxPage)
    return <Box color='brand.500' display={'flex'} alignItems={'center'}>
        <Box cursor={'pointer'} onClick={() => {
            if(currentPage > 1)
                onPageChange(currentPage - 1)
        }} borderRadius={'20px'} background={'brand.000'} display={'flex'} alignItems={'center'} color={currentPage > 1 ? 'brand.500' : 'gray.300'} p='0.5em'><Icon as={RiArrowLeftLine}/></Box>
        <Text px='1em'>{currentPage}</Text>
        <Box onClick={() => {
            if(currentPage < maxPage){
                onPageChange(currentPage + 1)
            }
        }} cursor={'pointer'} borderRadius={'20px'} background={'brand.000'} display={'flex'} alignItems={'center'} color={currentPage < maxPage ? 'brand.500' : 'gray.300'} p='0.5em'><Icon as={RiArrowRightLine}/></Box>
    </Box>
}