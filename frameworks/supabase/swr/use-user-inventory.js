

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
    .filter('close_bid', 'lt', 'now()')
    

    return res
   
}

export function useUserInventory(id) {
    const { data, error, mutate } = useSWR(['user-inventory', id], fetcher)
    return {
        mutate,
        data: data?.data || [],
        count: data?.count || 0,
        isLoading: !error && !data,
        isError: error
    }
}
