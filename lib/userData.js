import { getToken } from "./authenticate";
import { isAuthenticated } from "./authenticate";

export async function makeRequest( endPoint, method, body = null ){
    if (isAuthenticated){
        try {
            const API_URL = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
        
            const token = await getToken();
            const headers ={
                'Authorization': `JWT ${token}`,
                'Content-type' : 'application/json' 
            };

            const requestOptions = {
                method,
                headers,
                body : body ? JSON.stringify(body) : null
            }

            const response = await fetch (API_URL, requestOptions);
            if(response.ok){
                return await response.json();
            }else{
                //fail to retrieve data
                return [];
            }
        } catch (error) {
            //console.log('Error on request ', error, path, method );
            throw error;
        }
    }else{
        //console.log(`Please LogIn with a valid account`)
    }
}

export async function addToFavourites(id){
    // search how to validateId(id)
    const endpoint = `api/user/favourites/${id}`;
    return await makeRequest(endpoint, 'PUT');
}

export async function removeFromFavourites(id){
    const endpoint = `api/user/favourites/${id}`;
    return await makeRequest(endpoint, 'DELETE');
}

export async function getFavourites(){
    const endpoint = 'api/user/favourites';
    return await makeRequest(endpoint, 'GET');
}

export async function addToHistory(id){
    const endpoint = `api/user/history/${id}`;
    return await makeRequest(endpoint, 'PUT');
}

export async function removeFromHistory(id){
    const endpoint = `api/user/history/${id}`;
    return await makeRequest(endpoint, 'DELETE');
}

export async function getHistory(){
    const endpoint = `api/user/history`;
    return await makeRequest(endpoint, 'GET');
}