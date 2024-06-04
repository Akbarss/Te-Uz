import axios from "axios";
import { useMutation } from "react-query";

const API = "http://localhost:30001/goods";

export function useGetData() {
  return useMutation(async (path) => {
    try {
      const res = await axios.get(API, path);
      return res.data;
    } catch (e) {
      console.error("Error fetch", e);
      throw e;
    }
  });
}

export function useDeleteData() {
  return useMutation(async (path) => {
    try {
      const res = await axios.delete(API + path);
      return res.data;
    } catch (e) {}
  });
}

export function useEditData() {
  return useMutation(async ({ path, body }) => {
    try {
      const res = await axios.patch(API + path, body);
      return res.data;
    } catch (e) {}
  });
}
