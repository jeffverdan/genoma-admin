// stores/useAdminStore.ts
import { create } from "zustand";
import getLojas from "@/apis/getLojas";
import getUsuarios from "@/apis/getUsers";
import { GetLojasResType, GetUsersListType } from "@/types/APIs";
import getListPerfis from "@/apis/getListPerfis";
import { UserDataColaboradorType } from "@/apis/gerUserById";

type AdminStore = {
  selectedIndex: number;
  userData: UserDataColaboradorType | undefined;
  setUserData: (userData: UserDataColaboradorType | undefined) => void;
  lojas: GetLojasResType[];
  cargos:{ value: number, name: string }[]
  usuarios: GetUsersListType[];
  setSelectedIndex: (index: number) => void;
  fetchLojas: () => Promise<void>;
  fetchCargos: () => Promise<void>;
  fetchUsuarios: () => Promise<void>;
};

const useAdminStore = create<AdminStore>((set) => ({
  selectedIndex: 0,
  lojas: [],
  usuarios: [],
  cargos: [],
  userData: undefined,

  setUserData: (e) => set({ userData: e }),
  setSelectedIndex: (index) => set({ selectedIndex: index }),

  fetchLojas: async () => {
    const lojas = await getLojas();
    if (lojas) set({ lojas });
  },

  fetchCargos: async () => {
    const cargos = await getListPerfis()
    if(cargos) set({ cargos })
  },

  fetchUsuarios: async () => {
    const usuarios = await getUsuarios();
    if (usuarios) set({ usuarios });
  },
}));

export default useAdminStore;
