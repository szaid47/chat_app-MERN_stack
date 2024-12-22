import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import axios from "axios";
import toast from "react-hot-toast";

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
    } ,
    signup: async  (data)=>{
        set ({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set ({authUser:res.data});
            toast.success("signup successful");
            

        } catch (error) {
            toast.error(error.response.data.message );
        }finally{
            set ({ isSigningUp:false});
        }
    } ,

    logout : async() =>{
        try {
           await axiosInstance.post("/auth/logout");
           set({authUser:null}) ;
           toast.success("logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message);
            
        }
    }
}))