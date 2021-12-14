import { Box, Button, Checkbox, Container, Divider, Flex, Input, Spacer, Text, VStack} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import React from 'react';
import Link from 'next/link';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Nav } from '../../components/Nav';


export default function SignIn() {
  const theme = useTheme();
  const submit = (e) => {
    console.log(e)
  }

  return <div>
    <Container background={'gradient.300'} mx={0} maxW='100vw' centerContent>
      <Flex minHeight={'100vh'} alignItems={'center'} >
        <VStack width={'500px'} background='white' borderRadius={'20px'} padding='5em'>
          <Link href='/' passHref>
            <Text cursor={'pointer'} color='brand.500' fontWeight={'extrabold'} fontSize='5xl'>Ubid</Text>
          </Link>
          <Text fontSize='5xl'>Create Account</Text>
          <Text color='brand.700'>Already have an account ?
            <Link href='/sign-in' passHref>
              <Text cursor={'pointer'} color='brand.500' as='span'> Sign In</Text>
            </Link>
          </Text>
          <Divider />
     
       
          <form onSubmit={submit} style={{width:"100%"}}>
            <VStack>
            <FormControl id='name' isRequired>
              <Input borderRadius={12} py='20px' placeholder='John doe' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
            </FormControl>
            <FormControl id='email' isRequired>

              <Input borderRadius={12} py='20px' placeholder='email' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
            </FormControl>
            <FormControl id='address' isRequired>
              <Input borderRadius={12} py='20px' placeholder='address' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
            </FormControl>
            <FormControl id='password' isRequired>
              <Input borderRadius={12} py='20px' placeholder='password' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
            </FormControl>
            <FormControl id='confirm_password' isRequired>
              <Input borderRadius={12} py='20px' placeholder='password confirm' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
            </FormControl>
            <FormControl id='seller' isRequired>
              <Checkbox colorScheme={'brand'} defaultIsChecked>I am a seller </Checkbox>
            </FormControl>
            </VStack>
          
  

          <Spacer h={5} />
          <Button type='submit'  borderRadius={12} py='24px' variant={'solid'} colorScheme={'brand'} width={'100%'}>Sign Up With Email</Button>
          </form>
        </VStack>
      </Flex>
    </Container>
  </div>
}