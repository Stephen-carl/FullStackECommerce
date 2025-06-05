const API_URL = process.env.EXPO_PUBLIC_API_URL;


export async function login(email: string, password: string) {
    // send post request to api
    try {
        const url = `${API_URL}/auth/login`;
        const res = await fetch(url, {
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res.json();
        if (data.message !== 'success') {
            console.log(data);
            
            throw Error(data.message);
        }
        console.log(`=== User ${data.user.email} logged in ===}`);
        console.log(data);
        
        return data;
    } catch (error) {
        console.log(error);
        throw error;        
    }
}

export async function signup(email: string, password: string) {
    // send post request to api
    // try {
        const url = `${API_URL}/auth/register`;
        const res = await fetch(url, {
            method : 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res.json();
        if (data.message !== 'success') {
            console.log(data);
            
            throw Error(data.message);
        }
        console.log(`=== User ${data.user.email} logged in ===}`);
        
        return data;
    // } catch (error) {
    //     console.log(error);
    //     throw error;        
    // }
}