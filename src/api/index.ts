import axios, { AxiosError } from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;

const getToken = () => {
  return sessionStorage.getItem("token");
};

function handleAxiosError(error: AxiosError, text?: string) {
  if (error.response) {
    return text ? text : "Something went wrong. Try again later.";
  } else if (error.request) {
    return "No response from server!";
  } else {
    return "Request Error!";
  }
}

export const userHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
};

export const userAxios = axios.create({
  headers: userHeaders,
});

userAxios.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export const apiErrors = {
  register: "User registration error!",
  check: "User with this ID does not exists!",
  info: "Сan not get User data!",
  delete: "Can not delete User!",
};

// functions

export const checkUser = async (id: number) => {
  try {
    const response = await userAxios.post(
      "/check-user",
      JSON.stringify({
        "uuid": id,
      })
    );
    const {
      status,
      data: { success, data },
    } = response;

    return { status, success, data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.check);
    }
  }
};

export const registerUser = async (user: WebAppUser) => {
  const data = JSON.stringify({
    uuid: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    photo_url: null,
  });

  try {
    const response = await userAxios.post("/auth", data);
    const {
      status,
      data: {
        data: { token_type, access_token },
      },
    } = response;
    sessionStorage.setItem("token", `${token_type} ${access_token}`);
    return status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.register);
    }
  }
};

export const deleteUser = async () => {
  try {
    const response = await userAxios.delete("/user/delete");
    const { status } = response;
    return status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.delete);
    }
  }
};

export const infoUser = async () => {
  try {
    const response = await userAxios.get("/user/info");
    const {
      status,
      data: { success, data },
    } = response;
    return { status, success, data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};
