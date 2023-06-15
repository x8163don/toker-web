import axios from "axios";

export const getFileURL = (objKey) => {
    return `${process.env.REACT_APP_API_BASE_URL}/${objKey}`
}

export const uploadFile = async (url, file, isPublic) => {
    const headers = {
        "Content-Type": file.type
    }

    if (isPublic) {
        headers["X-Amz-ACL"] = "public-read"
    }

    const resp = await axios.put(url, file, {
        headers: headers
    })
    return resp.data
}

export const deleteFile = async (url) => {
    const resp = await axios.delete(url)
    return resp.data
}