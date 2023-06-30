import axios from "axios";
import _ from "lodash";
import qs from "qs";

export const getCustomer = async (id) => {
  let axiosResponse = await axios.get(`/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return axiosResponse.data;
};

export const getCustomers = async () => {
  let axiosResponse = await axios.get(`/customers`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return axiosResponse.data;
};

export const searchCustomers = async (filter) => {
  let defaultFilter = {
    name: "",
    limit: 10,
    page: 1,
    phone: "",
    city: "",
    district: "",
    order_by: "",
  };

  _.merge(defaultFilter, filter);
  Object.keys(defaultFilter).forEach((key) => {
    if (defaultFilter[key] === "") {
      delete defaultFilter[key];
    }
  });

  let axiosResponse = await axios.get(`/customers:search`, {
    params: defaultFilter,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  return axiosResponse.data;
};

export const addCustomer = async (customer) => {
  let axiosResponse = await axios.post("/customer", customer, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return axiosResponse.data;
};

export const updateCustomer = async (customer) => {
  let axiosResponse = await axios.put(`/customer/${customer.id}`, customer, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });

  return axiosResponse.data;
};

export const deleteCustomer = async (id) => {
  let axiosResponse = await axios.delete(`/customer/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return axiosResponse.data;
};

export const getUploadInfo = async (id, filename) => {
  let axiosResponse = await axios.post(
    `/customer/${id}/upload_info`,
    {
      filename: filename,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return axiosResponse.data;
};

export const addTag = async (customerId, tagId) => {
  const axiosResponse = await axios.post(
    `/customer/${customerId}/tag:add`,
    { tag_id: tagId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return axiosResponse.data;
};

export const changeTag = async (customerId, oldTagId, newTagId) => {
  const axiosResponse = await axios.post(
    `/customer/${customerId}/tag:change`,
    {
      old_tag_id: oldTagId,
      new_tag_id: newTagId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return axiosResponse.data;
};

export const removeTag = async (customerId, tagId) => {
  const axiosResponse = await axios.post(
    `/customer/${customerId}/tag:remove`,
    { tag_id: tagId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return axiosResponse.data;
};
