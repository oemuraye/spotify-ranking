import API from "../api/api";

export const getAllTracks = async () => {
    try {
        const { data } = await API.get('/all-tracks');
        
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const getTop50Tracks = async () => {
    try {
        const { data } = await API.get('/new50-top-tracks');
        
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export const getCountryTopTracks = async (country) => {
    try {
        const { data } = await API.get(`/top-tracks/${country}`);
        
        return data
    } catch (error) {
        console.log(error.message);
    }
}

