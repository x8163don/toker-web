import axios from "axios";
import {uploadFile} from "../file/FileUploader";

export const authCheck = async () => {
    const axiosResponse = await axios.get("/auth/check", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });
    return axiosResponse.status;
}

export const getAccount = async () => {
    const axiosResponse = await axios.get("/account", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });
    return axiosResponse.data;
}

export const updateAccount = async (account) => {
    const data = {
        name: account.name,
        nickname: account.nickname,
        email: account.email,
        phone: account.phone,
        avatar: account.avatar
    }
    const axiosResponse = await axios.put("/account", data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });
    return axiosResponse.data;
}

export const uploadAvatar = async (file) => {

    const response = await axios.post("/avatar/uploadInfo", {content_type: file.type},
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem("token")}`
            }
        }
    )

    await uploadFile(response.data.upload_url, file, true)

    return response.data.avatar_url;
}