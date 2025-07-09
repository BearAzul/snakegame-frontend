import { create } from "zustand"
import snakeAPI from "../api/index.js"
import toast from "react-hot-toast";

export const useScoreStore = create((set, get) => ({
  leaderboard: [],
  bestScore: 0,
  isPostingScore: false,
  isLeaderboardLoading: false,
  isBestScoreLoading: true,

  getLeaderboard: async () => {
    set({ isLeaderboardLoading: true });
    try {
      const res = await snakeAPI.get("/scores");
      set({ leaderboard: res.data });
    } catch (error) {
      console.log("Error pada getLeaderboard: ", error);
      toast.error("Gagal memuat papan skor.");
    } finally {
      set({ isLeaderboardLoading: false });
    }
  },

  postScore: async (score) => {
    set({ isPostingScore: true });
    try {
      const res = await snakeAPI.post("/scores", { score });
      set({bestScore: res.data.score})
      toast.success(res.data.message);
      get().getBestScore();
    } catch (error) {
      console.log("Error pada postScore: ", error);
      toast.error(error.response?.data?.message || "Gagal mengirim skor.");
    } finally {
      set({ isPostingScore: false });
    }
  },

  getBestScore: async () => {
    set({ isBestScoreLoading: true });
    try {
      const res = await snakeAPI.get("/scores/best");
      set({ bestScore: res.data.bestScore });
    } catch (error) {
      console.log("Error pada getBestScore: ", error);
      set({ bestScore: 0 });
    } finally {
      set({ isBestScoreLoading: false });
    }
  },
}));