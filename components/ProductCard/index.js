import { Box, Divider, Image, Text, useTheme, Icon, } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link'
import useCountDown from 'react-countdown-hook';


import { RiAuctionFill } from 'react-icons/ri'
import { dhm } from '../../utils';
import { useTimer } from 'react-timer-hook';

export function ProductCard({ data }) {
    const {
        seconds,
        minutes,
        hours,
        days,
    } = useTimer({ expiryTimestamp: new Date(data?.close_bid), autoStart: true });

    const theme = useTheme()

    return <Box cursor={'default'} userSelect={'none'} maxW='300px' boxSizing='border-box' overflow='hidden'>

        <div style={{ position: "relative", cursor:"pointer", zIndex: 1, overflow: "hidden", borderRadius: 24, background: theme.colors.brand['000'] }} >
            <Link passHref={true} href={`/item/${data.id}`}>
                <Image width={300} height={300} transition='0.4s ease' _hover={{ transform: 'scale(1.08)', borderRadius: 20, transition: "0.6s ease all" }} src={data?.images[0]?.url} alt={''} />
            </Link>
        </div>
        <Box  >
            <Box display={'flex'} flexDirection={'row'} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
                <Text noOfLines={1} mt='0.5em' fontWeight={'bold'} fontSize='xl'>{data?.label}</Text>
                <Text ml={'1em'} color='brand.500' as='span' mt='0.5em' fontWeight={'bold'} fontSize='xl' >200$</Text>

            </Box>

            <Box display={'flex'} flexDirection={'row'} width={'100%'} justifyContent={'space-between'}>
                <Text textTransform='uppercase' fontSize='xs'>{data?.category?.label}</Text>
                <Text color='brand.400'>{data?.owner?.full_name}</Text>
            </Box>
            <Box>
                { new Date(data?.close_bid) > new Date() ? <Text fontSize={'xs'} color='brand.400'>Ending in {days} days, {hours} hours, {minutes} minutes, {seconds} seconds</Text> : <Text fontSize={'xs'} color={'red.600'}>Expired</Text>  }
            </Box>

        </Box>
    </Box>
}