import React, { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser, UserState } from "../redux/userSlice";
import { SetLoading } from "../redux/loaderSlice";
import { GetUserInfo } from "../apicalls/users";
import SidebarLayout from "./SidebarLayout";


function ProtectedPage(props:any) {
  
  const {user}:UserState = useSelector((state:any) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetUserInfo();
      dispatch(SetLoading(false));
      if (response.success) {
        // message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      }
      else{
        message.error(response.message);
        localStorage.removeItem("token");
        window.location.href="/login";
      }
    } catch (error:any) {
        dispatch(SetLoading(false));
        message.error(error.message);
        localStorage.removeItem("token");
        window.location.href="/login";
    }
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
        if(!user){
            getData();
        }
    }
    else{
        navigate("/login");
    }
  }, []);

  return ( 
    user && (
        <SidebarLayout>
          {props.children}
        </SidebarLayout>
    )
  );
}

export default ProtectedPage;