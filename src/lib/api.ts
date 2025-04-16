
// API client for fetching data
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const api = axios.create({
  baseURL: API_URL,
});

export const fetchPosts = async (page = 1, limit = 10) => {
  const response = await api.get(`/posts?_page=${page}&_limit=${limit}`);
  return response.data;
};

export const fetchPost = async (id: number) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const fetchPostComments = async (postId: number) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const fetchUser = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
