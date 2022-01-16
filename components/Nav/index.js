import { Box, Flex, Spacer, Text, Icon, Divider, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import React from 'react';
import { RiUser2Fill, RiUserFill } from 'react-icons/ri';
import Link from 'next/link'
import { supabase } from '../../frameworks/supabase';
import { useRouter } from 'next/router'



export function Nav() {
  const theme = useTheme()
  const router = useRouter()
  const user = supabase.auth.user()
  const session = supabase.auth.session()
  console.log('user', user)
  return <Box><Flex py='1em' flexDirection={'row'} alignItems={'center'} px='2em'>
    <Link passHref href='/'>
      <Text cursor={'pointer'} fontWeight='extrabold' color='brand.500' fontSize={'3xl'}>Ubid</Text>
    </Link>
    <Spacer />

    {user && session ? <Menu>
      <MenuButton zIndex={0}  _hover={{ borderColor: 'brand.500' }} borderRadius={'50%'}  borderWidth={1} width={50} height={50}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Icon h={'100%'} color='brand.500' as={RiUser2Fill} />
        </Box>
      </MenuButton>
      <MenuList borderColor={'brand.000'} color='brand.700' >
        <MenuItem _hover={{ background: "brand.000" }} onClick={() => router.push('/profile')}>Profile</MenuItem>
        <MenuItem _hover={{ background: "brand.000" }} onClick={() => {
          
          supabase.auth.signOut();
          router.push('/sign-in')
        }} >Sign out</MenuItem>
      </MenuList>
    </Menu>
    :<Link passHref href='/sign-in'><Box
      as='button'
        display={'block'}
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        lineHeight='1.2'
        width={'100px'}
          height={'40px'}
        transition='0.4s ease'
        borderRadius='16px'
        bg='brand.500'
        color='white'
        _hover={{ transition: '0.4s ease', bg: theme.colors.brand[400], }}
      // _active={{
      //   transform: 'scale(0.98)',
      //   borderColor: theme.colors.brand[100],
      // }}
      >
        Sign In
      </Box>
      </Link>
    }

  </Flex>
    <Divider />
  </Box>
}