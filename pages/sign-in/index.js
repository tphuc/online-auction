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
import { useForm } from "react-hook-form";
import { supabase } from '../../frameworks/supabase';
import { useRouter } from 'next/router'


export default function SignIn() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm();
  const router = useRouter()
  
  const submit = async (data) => {
    console.log(data)
    let {user, error} = await supabase.auth.signIn(data);
    console.log(user, error)
    if(user)
      router.push('/discover')

  }

  return <div>
    <Container background={'gradient.300'} mx={0} maxW='100vw' centerContent>
      <Flex minHeight={'100vh'} alignItems={'center'} >
        <VStack width={'500px'} background='white' borderRadius={'20px'} padding='5em'>
          <Link href='/' passHref>
            <Text cursor={'pointer'} color='brand.500' fontWeight={'extrabold'} fontSize='5xl'>Ubid</Text>
          </Link>
          <Text fontSize='5xl'>Sign In</Text>
          <Text color='brand.700'> {`Don't have an account ?`}
            <Link href='/sign-up' passHref>
              <Text cursor={'pointer'} color='brand.500' as='span'> Sign Up</Text>
            </Link>
          </Text>
          <Divider />
     
       
          <form onSubmit={handleSubmit(submit)} style={{width:"100%"}}>
            <VStack my='2em'>
            <FormControl id='email' isRequired>

              <Input {...register('email')} type={'email'} borderRadius={12} py='20px' placeholder='email' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
            </FormControl>

            <FormControl id='password' isRequired>
              <Input {...register('password')} type={'password'} borderRadius={12} py='20px' placeholder='password' focusBorderColor='brand.500' background={'brand.000'} _hover={{ background: 'brand.50' }} variant='filled' />
            </FormControl>
            </VStack>
          
  

          <Spacer h={5} />
          <Button type='submit'  borderRadius={12} py='24px' variant={'solid'} colorScheme={'brand'} width={'100%'}>Continue</Button>
          </form>
        </VStack>
      </Flex>
    </Container>
  </div>
}