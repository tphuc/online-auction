import { Box, Flex, Spacer, Text, Icon } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import React from 'react';
import { RiUserFill } from 'react-icons/ri';
import Link from 'next/link'


export function Nav(){
    const theme = useTheme()
    return <Flex py='1em' alignItems={'center'} px='2em'>
        <Link href='/'>
            <Text cursor={'pointer'} fontWeight='extrabold' color='brand.500' fontSize={'3xl'}>Ubid</Text>
        </Link>
        <Spacer/>
        <Box
            display={'flex'}
            as='button'
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            width='220px'
            lineHeight='1.2'
            transition='0.4s ease'
            px='20px'
            py='20px'
            borderRadius='20px'
            bg='brand.000'
            color='brand.900'
            _hover={{ transition: '0.4s ease', bg: theme.colors.brand[50], }}
            // _active={{
            //   transform: 'scale(0.98)',
            //   borderColor: theme.colors.brand[100],
            // }}
          >
            Sign In
            <Icon ml='1em' as={RiUserFill}/>
          </Box>
    </Flex>
}