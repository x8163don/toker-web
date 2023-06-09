import axios from "axios";

export const getCustomer = async (id) => {
    let axiosResponse = await axios.get(`/customer/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });
    return axiosResponse.data;
}

export const getCustomers = async () => {
    let axiosResponse = await axios.get(`/customers`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });
    return axiosResponse.data;
}

export const addCustomer = async (customer) => {
    let axiosResponse = await axios.post("/customer", customer, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });
    return axiosResponse.data;
}

export const updateCustomer = async (customer) => {
    let axiosResponse = await axios.put(`/customer/${customer.id}`, customer, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });

    return axiosResponse.data;
}

export const deleteCustomer = async (id) => {
    let axiosResponse = await axios.delete(`/customer/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${localStorage.getItem("token")}`
        }
    });
    return axiosResponse.data;
}

export const getUploadInfo = async (id, filename, contentType) => {
    let axiosResponse = await axios.post(`/customer/${id}/upload_info`, {
            "filename": filename,
            "content_type": contentType
        },
        {
            headers: {
                "Content-Type": "application/json", "Authorization": `${localStorage.getItem("token")}`
            }
        }
    )
    return axiosResponse.data;
}