import { create } from "zustand";
import snakeAPI from "../api/index.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await snakeAPI.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error pada checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isCheckingAuth: true });
    try {
      const res = await snakeAPI.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Akun berhasil dibuat");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  signIn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await snakeAPI.post("/auth/signin", data);
      set({ authUser: res.data });
      toast.success("Login Berhasil");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await snakeAPI.post("/auth/logout");
      set({ authUser: null });
      toast.success("logout Berhasil");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await snakeAPI.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Foto profil berhasil di ubah");
    } catch (error) {
      console.log("Error pada updateProfile Store: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
