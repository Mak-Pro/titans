import axios, { AxiosError } from "axios";
import { API } from "@/constants";
import { RegisterDataProps, TitanAttributes } from "@/Types";

axios.defaults.baseURL = API;

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

export const loginUser = async (initData: string) => {
  try {
    const response = await userAxios.post(`/auth/telegram/login`, { initData });
    const {
      data: { accessToken },
      status,
    } = response;
    sessionStorage.setItem("token", `Bearer ${accessToken}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const checkUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(
      `/users/verify/telegramId/${telegramId}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, error.message);
    }
  }
};

export const registerUser = async (data: RegisterDataProps) => {
  try {
    const response = await userAxios.post("/users", data);
    return response;
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

export const infoUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(`/users/${telegramId}`);
    const { data } = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};

export const checkUserName = async (username: string) => {
  try {
    const response = await userAxios.get(`/users/verify/username/${username}`);
    const {
      data: { usernameExists },
      status,
    } = response;
    return usernameExists;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};

export const referralUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(`/users/${telegramId}/referral`);
    const { data } = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};

export const friendsUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(`/users/${telegramId}/friends`);
    const { data } = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};

export const titansUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(`/users/${telegramId}/titans`);
    const { data } = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};

export const questsUser = async (telegramId: number) => {
  try {
    const response = await userAxios.get(`/users/${telegramId}/quests`);
    const { data } = response;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};

export const questCompleteUser = async (
  telegramId: number,
  data: { questId: number }
) => {
  try {
    const response = await userAxios.post(
      `/users/${telegramId}/quests/complete`,
      data
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.register);
    }
  }
};

export const referralsUser = async (data: {
  referral: string;
  telegramId: number;
}) => {
  try {
    const response = await userAxios.post("/referrals", data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.register);
    }
  }
};

// GAME
export const gameController = async (
  url: string,
  data: { telegramId: number }
) => {
  try {
    const response = await userAxios.post(url, data);
    const { data: gameData } = response;
    return gameData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.register);
    }
  }
};

// TITANS

export const titanUpdate = async (
  telegramId: number,
  data: { attribute: TitanAttributes }
) => {
  try {
    const response = await userAxios.put(`/titans/${telegramId}`, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return handleAxiosError(error, apiErrors.info);
    }
  }
};
