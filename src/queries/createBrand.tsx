import axios from "axios";

async function createBrand(data: any) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/brands/create`,
    data
  );
  return response;
}

export default createBrand;
