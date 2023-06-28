import axios from "axios";

export const getTags = async () => {
  const axiosResponse = await axios.get("/tags", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return axiosResponse.data.tags;
};

export const getTag = async (id) => {
  const axiosResponse = await axios.get(`/tags/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return axiosResponse.data;
};

export const addTag = async (name) => {
  const axiosResponse = await axios.post(
    "/tag",
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return axiosResponse.data.tag_id;
};

export const updateTag = async (id, name) => {
  const axiosResponse = await axios.put(
    `/tag/${id}`,
    { name },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    }
  );
  return axiosResponse.data;
};

export const deleteTag = async (id) => {
  const axiosResponse = await axios.delete(`/tag/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
  return axiosResponse.data;
};
