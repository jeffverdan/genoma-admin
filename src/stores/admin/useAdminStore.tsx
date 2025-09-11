// stores/useAdminStore.ts
import { create } from "zustand";
import getLojas from "@/apis/getLojas";
import getUsuarios from "@/apis/getUsers";
import { GetLojasResType, GetUsersListType } from "@/types/APIs";
import getListPerfis from "@/apis/getListPerfis";
import getUserById, { UserDataColaboradorType } from "@/apis/gerUserById";
import getListBancos, { ListBancosType } from "@/apis/getListBancos";

type AdminStore = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;

  userData: UserDataColaboradorType | undefined;
  setUserData: (userData: UserDataColaboradorType | undefined) => void;
  fetchUsuario: (e: number | string) => void

  lojas: GetLojasResType[];
  fetchLojas: () => Promise<void>;

  cargos:{ value: number, name: string }[]
  fetchCargos: () => Promise<void>;

  usuarios: GetUsersListType[];
  fetchUsuarios: () => Promise<void>;

  bancos: ListBancosType;
  fetchBancos: () => Promise<void>;
};

const useAdminStore = create<AdminStore>((set) => ({
  selectedIndex: 0,
  lojas: [],
  usuarios: [],
  cargos: [],
  bancos: [],
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

  fetchBancos: async () => {
    const bancos = await getListBancos();
    if(bancos) set({ bancos })
  },

  fetchUsuario: async (id: number | string) => {
    const userData = await getUserById(id.toString());
    if(userData) set({ userData })
  },
}));

export default useAdminStore;
