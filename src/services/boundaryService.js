import axios from 'axios';

const BASE_URL = 'https://vanitysoft-boundaries-io-v1.p.rapidapi.com/reaperfire/rest/v1/public/boundary';

const RAPIDAPI_KEY = process.env.REACT_APP_RAPIDAPI_KEY;

export const fetchZipCodeBoundary = async (zipCode) => {
    try {
        const { data } = await axios.get(`${BASE_URL}?zipcode=${zipCode}`, {
            headers: {
                'x-rapidapi-host': 'vanitysoft-boundaries-io-v1.p.rapidapi.com',
                'x-rapidapi-key': RAPIDAPI_KEY,
            },
        });

        return data;
    } catch (error) {
        console.error('Error fetching boundary data:', error);
        throw error;
    }
};
