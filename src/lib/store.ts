import { create } from "zustand";

interface AdminState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Example for managing active tab or notifications
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  activeTab: "dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
