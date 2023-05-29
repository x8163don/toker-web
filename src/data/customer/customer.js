import axios from "axios";

export const getCustomer = async (id) => {
    let axiosResponse = await axios.get(`/customer/${id}`);
    return axiosResponse.data;
}

export const getCustomers = async () => {
    let axiosResponse = await axios.get(`/customers`);
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
    let axiosResponse = await axios.put(`/customer/${customer.id}`, customer);
    return axiosResponse.data;
}
