

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
    .filter('close_bid', 'gt', 'now()')
    .order('high_bid', { ascending: false })
    .limit(4)
    


    return res
   
}

export function useHighestPriceItems(id) {
    const { data, error, mutate } = useSWR(['highest-price-item', id], fetcher)
    return {
        mutate,
        data: data?.data || [],
        count: data?.count || 0,
        isLoading: !error && !data,
        isError: error
    }
}
