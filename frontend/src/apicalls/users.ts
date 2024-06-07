import { axiosInstance } from ".";


// Login User

export const LoginUser = async(payload:any)=>{
    try {
        const {data} = await axiosInstance.post("/api/users/login",payload);
        return data;
    } catch (error:any) {
        return error.response.data;   
    }
}


// Register User

export const RegisterUser = async(payload:any)=>{
    try {
        const {data} = await axiosInstance.post("/api/users/register",payload);
        return data;
    } catch (error:any) {
        return error.response.data;   
    }
}


// Get user info

export const GetUserInfo = async()=>{
    try {
        const {data} = await axiosInstance.get("/api/users/get-user-info");
        return data;
    } catch (error:any) {
        return error.response.data;   
    }
}