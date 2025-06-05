// here i will put all my helper functions for making products calls
// the url
const API_URL = process.env.EXPO_PUBLIC_API_URL;


export async function listProducts() {
    try {
    const url = `${API_URL}/product/getProduct`;
    console.log("Fetching from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      console.error("Failed to fetch. Status:", response.status);
      return;
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return data.product;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }

}

export async function fetchProductByID(id:string) {
    try {
        const url = `${API_URL}/product/getProduct/${id}`;
        console.log("Fetching from:", url);
        
        const response = await fetch(url);
        if (!response.ok) {
            console.error("Failed to fetch. Status:", response.status);
            return;
        }
        // parse the data to json
        const data = await response.json();
        console.log("Fetched data:", data);
        return data.product;
    } catch (error) {
        console.log(error);
        throw error;
    }
}