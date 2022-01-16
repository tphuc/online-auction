

import useSWR from 'swr'
import { supabase } from '..'



const ENDPOINT = 'items'



const fetcher = async (key, id) => {

    let res = await supabase.from('items').select(`
        *,
        category (
            label
        ),
        owner (
            *
        ),
        bids (
            *
        )
    `, { count: 'exact' })
    .filter('owner', 'eq', id)
    .filter('close_bid', 'gt', 'now()')
    

    return res
   
}

export function useUserOnsale(id) {
    const { data, error, mutate } = useSWR(['user-onsale', id], fetcher)
    return {
        mutate,
        data: data?.data || [],
        count: data?.count || 0,
        isLoading: !error && !data,
        isError: error
    }
}
