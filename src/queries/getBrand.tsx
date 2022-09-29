import axios from 'axios';

async function getBrand(id: string){
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/brands/get_by_id/${id}`);
    return data;
}

export default getBrand;
