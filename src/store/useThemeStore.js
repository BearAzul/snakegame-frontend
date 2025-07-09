import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem("snake-theme") || "light",

  toggleTheme: () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === "light" ? "dark" : "light";

    localStorage.setItem("snake-theme", newTheme);
    set({ theme: newTheme });
  },
}));
