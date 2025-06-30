import api from "./api";

export const get = async (url: string, params?: unknown) => {
  const response = await api.get(url, { params });
  return response.data;
};

export const post = async (url: string, data: unknown) => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid payload");
  }
  const response = await api.post(url, data);
  return response.data;
};

export const postMultipart = async (url: string, data: FormData) => {
  const response = await api.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const put = async (url: string, data: unknown) => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid payload");
  }
  const response = await api.put(url, data);
  return response.data;
};

export const putMultipart = async (url: string, data: FormData) => {
  const response = await api.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const del = async (url: string) => {
  const response = await api.delete(url);
  return response.data;
};
