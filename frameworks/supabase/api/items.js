import { supabase } from "..";

export async function uploadFile(file){
    let _ = await supabase.storage.from('public').upload(`${file.name}`, file, {
        upsert: true
    })
    let { publicURL } = await supabase.storage.from('public').getPublicUrl(`${file.name}`)
    return {
        name: file.name,
        url: publicURL
    }
};

export  async function createItem(_data){
    const { file, ...rest } = _data;
    let files = Object.values(file)
    let images = await Promise.all(files?.map(async (item) => {
        let file_uploaded = await uploadFile(item);
        return file_uploaded
    })) 
   
    let id = await supabase.auth.user().id
    let res = await supabase.from('items').insert({
        owner: id,
        images,
        ...rest
    })
    return res
}

export async function getAllItems(){
    let res = await supabase.from('items').select(`*, 
        category (
            *
        ),
        owner (
            *
        ),
        bids (
            *,
            users (
                *
            )
        )
    `)
    return res
}

export async function getItem(id){
    let res = await supabase.from('items').select(`*, 
        category (
            *
        ),
        owner (
            *
        ),
        bids (
            *,
            users (
                *
            )
        )
    `).match({id})

    return res
}