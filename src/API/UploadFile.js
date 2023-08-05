import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const uploadFile = async (file, fileName) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);

        const res = await axios.put(`${BASE_URL}/uploadFile`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        return error;
    }
};
