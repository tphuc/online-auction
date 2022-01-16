

import useSWR from 'swr'
import { supabase } from '..'

const ENDPOINT = 'bids'



const fetcher = async (url, user_id) => {
    let res = await supabase.from('bids').select(`
        *,
        users (
            *
        ),
        items (
            *
        )
    `)
    .filter('user_id', 'eq', user_id)
    return res.data
   
}

export function useUserBids(user_id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error, mutate } = useSWR([ENDPOINT,  user_id], fetcher)
    return {
        mutate,
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
