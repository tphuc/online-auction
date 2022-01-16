import { Box, Text } from '@chakra-ui/react';
import React from 'react';




export function BidItem({data, ...props}){
    return <Box border={`1px solid`} my='5px' borderColor={`brand.000`} px='1em' py='0.5em' borderRadius={8}>
        <Text color='gray.600' fontSize={'sm'} textTransform={'uppercase'}>{new Date(data?.created_at).toLocaleString()}</Text>
        <Text noOfLines={1}><Text as='span' color='brand.400'>{data?.users?.full_name}</Text> offered for <Text as='span' color='brand.400'>{data.amount}$</Text> </Text>
    </Box>
}
