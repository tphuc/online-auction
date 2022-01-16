

import useSWR from 'swr'
import { supabase } from '..'
import { MAX_ITEMS_PER_PAGE } from '../../../config'


const ENDPOINT = 'items'



const fetcher = async (ENDPOINT, filter) => {
    const LIMIT = MAX_ITEMS_PER_PAGE;
    let res = supabase.from(ENDPOINT).select(`
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


    for(let k in filter){
        if(filter[k]){
            switch(k){
                case 'label':
                    res = res.filter('label', 'ilike', `%${filter[k]}%`)
                    break
                case 'category':
                    res = res.filter('category', 'eq', parseInt(filter[k]))
                    break
            }
        }
    }

    
    res = await res.range((filter['page'] - 1) * LIMIT, filter['page'] * LIMIT - 1)
    // res = await res.limit(LIMIT)
    

    return res
   
}

export function useItems(filter) {
    const { data, error, mutate } = useSWR([ENDPOINT, filter], fetcher)
    return {
        mutate,
        data: data?.data || [],
        count: data?.count || 0,
        isLoading: !error && !data,
        isError: error
    }
}
