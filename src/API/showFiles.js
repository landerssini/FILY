import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getFileToShow = async (fileToShowId) => {
    try {
        const res = await axios.get(`${BASE_URL}/showFile`,{
            params: {
                fileToShowId,
            },
        })
        return res.data.url
    } catch (error) {
        return error
    }
} 
