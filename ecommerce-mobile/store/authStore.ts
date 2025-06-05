import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


// this is saying create a set
export const useAuth = create(persist((set) => ({
    user: null,
    token: null,

    // set a user into the intial empty user, same with token
    setUser: (user : any) => set({ user }),
    setToken: (token: any) => set({ token }),
    }), 
    // i have to persist the storage to have the details of the user so that even on restart, i can still have access to the data
    {
        name: "auth-storage",
        storage: createJSONStorage(() => AsyncStorage),
    }
))