// stores/useAdminStore.ts
import { create } from "zustand";
import getLojas from "@/apis/getLojas";
import getUsuarios from "@/apis/getUsers";
import { GetLojasResType, GetUsersListType } from "@/types/APIs";

type AdminStore = {
  selectedIndex: number;
  lojas: GetLojasResType[];
  usuarios: GetUsersListType[];
  setSelectedIndex: (index: number) => void;
  fetchLojas: () => Promise<void>;
  fetchUsuarios: () => Promise<void>;
};

const useAdminStore = create<AdminStore>((set) => ({
  selectedIndex: 0,
  lojas: [],
  usuarios: [],

  setSelectedIndex: (index) => set({ selectedIndex: index }),

  fetchLojas: async () => {
    const lojas = await getLojas();
    if (lojas) set({ lojas });
  },

  fetchUsuarios: async () => {
    const usuarios = await getUsuarios();
    if (usuarios) set({ usuarios });
  },
}));

export default useAdminStore;
