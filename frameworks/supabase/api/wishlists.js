import { supabase } from ".."

export const WishlistAPI = {

    addToWishlist: async function({item, user}){
        let res = await supabase.from('wishlists').insert({
            user,
            item
        })
        return res
    },

    removeFromWishlist: async function({item, user}){
        let res = await supabase.from('wishlists').delete().match({
            item,
            user
        })
        return res
    }

}