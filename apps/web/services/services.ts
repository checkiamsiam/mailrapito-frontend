/* eslint-disable @typescript-eslint/no-unsafe-return */
import { appConfig } from "@config";
import axios from "axios";
import type { IBlog } from "../interface/commonInterface";
import type {
  IDomains,
  IEmailToken,
  IFetchMessages,
} from "../interface/servicesInterface";
import { loadObj, persistObj } from "../utils/cookie-config";
import {
  getLSEmails,
  getLSEmailsHistory,
  persistLSEmails,
} from "../utils/localStorage-config";

export const API_KEY = "nMpKDjd1baWWIBl7p357s1ac7RCbwWp1F8aLDB5n" ?? "";
const API = appConfig.api;

// ------------ Start of Email/Message Services ------------
export const fetchEmailToken = async () => {
  const { data } = await axios.post<IEmailToken>(
    `${API}/email/create/${API_KEY}`,
  );
  const allEmails = getLSEmails();
  console.log("fetchEmailToken", allEmails);
  persistObj("email", data?.data?.email_token);
  return data;
};

export const fetchMessages = async () => {
  const { data } = await axios.get<IFetchMessages>(
    `${API}/messages/${loadObj("email")}/${API_KEY}`,
  );
  const cookie = loadObj("email");
  console.log("cookie", cookie);
  persistLSEmails(String(data.data.mailbox), String(cookie));
  console.log("fetchMessages", data);
  return data;
  // setTimeout(() => {}, 1000);
};

export const deleteEmail = async () => {
  const allEmails = getLSEmails();
  const deletedEmail = allEmails.find((obj) => obj.token === loadObj("email"));
  console.log("deletedEmail", deletedEmail);
  const history = getLSEmailsHistory();
  if (deletedEmail) {
    deletedEmail.inHistory = true;
    history.unshift(deletedEmail);
  }
  localStorage.setItem("emailsHistory", JSON.stringify(history));
  const { data } = await axios.post<IEmailToken>(
    `${API}/email/delete/${loadObj("email")}/${API_KEY}`,
  );
  // console.log("deleteEmail", data);
  const index = allEmails.findIndex((obj) => obj.token === loadObj("email"));
  if (index !== -1) {
    allEmails.splice(index, 1);
    localStorage.setItem("emails", JSON.stringify(allEmails));
  }

  persistObj("email", data?.data?.email_token);
  return data;
};

export const fetchDomains = async () => {
  const { data } = await axios.get<IDomains>(`${API}/domains/${API_KEY}`);
  // console.log("fetchDomains", data);
  return data;
};

export const createNewEmail = async ({
  name,
  domain,
}: {
  name: string;
  domain: string;
}) => {
  console.log(name, domain);
  const { data } = await axios.post<IEmailToken>(
    `${API}/email/change/${loadObj("email")}/${name}/${domain}/${API_KEY}`,
  );
  console.log("createNewEmail", data);
  persistObj("email", data?.data?.email_token);
  return data;
};

export const deleteMessage = async (id) => {
  const { data } = await axios.post(`${API}/message/delete/${id}/${API_KEY}`);
  return data;
};

export const readMessage = async (id: string) => {
  const { data } = await axios.post(`${API}/message/read/${id}/${API_KEY}`);
  return data;
};

export const downloadDocument = async (filename) => {
  window.open(`${API}/download/${filename}`);
};

export const addToFavorites = async (id: string) => {
  const { data } = await axios.post(`${API}/message/favorite/${id}/${API_KEY}`);
  return data;
};

// ------------ End of Email/Message Services ------------

// ------------ Start of Auth Services ------------
export const verifyEmail = async (verificationToken, email) => {
  const { data } = await axios.post(`${API}/v1/auth/verify-email`, {
    verificationToken,
    email,
  });
  return data;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post(
    `${API}/v1/auth/login`,
    {
      email,
      password,
    },
    { withCredentials: true },
  );
  return data;
};

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { data } = await axios.post(`${API}/v1/auth/register`, {
    firstName,
    lastName,
    email,
    password,
  });
  return data;
};

export const forgotPassword = async (email: string) => {
  const { data } = await axios.post(`${API}/v1/auth/forgot-password`, {
    email,
  });
  return data;
};

export const resetPassword = async (token, email, password) => {
  const { data } = await axios.post(`${API}/v1/auth/reset-password`, {
    token,
    email,
    password,
  });
  return data;
};

export const logout = async () => {
  const { data } = await axios.delete(`${API}/v1/auth/logout`, {
    withCredentials: true,
  });
  return data;
};

// ------------ End of Auth Services ------------

// ------------ Start of Blog Services ------------

export const getAllBlogs = async () => {
  const { data } = await axios.get<{ success: boolean; allBlogs: IBlog[] }>(
    `${API}/v1/blog/all-blogs`,
  );
  return data;
};

export const getSingleBlog = async (id: string) => {
  const { data } = await axios.get<{ success: boolean; singleBlog: IBlog }>(
    `${API}/v1/blog/single-blog/${id}`,
  );
  return data;
};

export const getMostReadBlogs = async (id: string) => {
  const { data } = await axios.get<{
    success: boolean;
    mostReadBlogs: IBlog[];
  }>(`${API}/v1/blog/most-read-blogs/${id}`);
  return data;
};

export const getAlsoLikeBlogs = async (id: string) => {
  const { data } = await axios.get<{ success: boolean; likeBlogs: IBlog[] }>(
    `${API}/v1/blog/also-like-blogs/${id}`,
  );
  return data;
};

// ------------ End of Blog Services ------------
