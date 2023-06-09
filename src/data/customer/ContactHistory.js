import axios from "axios";

export const getContactHistory = async (customerId, contactHistoryId) => {
    const axiosResponse = await axios.get(`/customer/${customerId}/contact_history/${contactHistoryId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    })
    return axiosResponse.data
}

export const listContactHistories = async (customerId) => {
    const axiosResponse = await axios.get(`/customer/${customerId}/contact_history`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    })
    return axiosResponse.data
}

export const addContactHistory = async (customerId, title, content, fileIds) => {
    const axiosResponse = await axios.post(`/customer/${customerId}/contact_history`, {
        title,
        content,
        "file_ids": fileIds
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    })
    return axiosResponse.data;
}

export const updateContactHistory = async (customerId, contactHistoryId, title, content) => {
    const axiosResponse = await axios.put(`/customer/${customerId}/contact_history/${contactHistoryId}`, {
        title,
        content,
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    })
    return axiosResponse.data
}

export const deleteContactHistory = async (customerId, contactHistoryId) => {
    const axiosResponse = await axios.delete(`/customer/${customerId}/contact_history/${contactHistoryId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    })
    return axiosResponse.data
}