import axios from "axios";

export const getFileURL = (objKey) => {

    return `${process.env.REACT_APP_API_BASE_URL}/${objKey}`
}

export const uploadFile = async (url, file) => {
    await axios.put(url, file, {
        headers: {
            "Content-Type": file.type
        }
    }).then(response => {
        return response.data
    })
}

export const deleteFile = async (url) => {
    await axios.delete(url).then(response => {
        return response.data
    })
}