import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";

export const useAuthStore = create((set)=> ({
    authUser :null,
    isSigningUp:false,
    isLoggingin:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check");
            
            set({authUser:res.data})
        }catch(error){
            set({authUser:null})
            console.log("error in checkauth",error);
        }finally{
            set({isCheckingAuth:false})
        }
    } 
}))