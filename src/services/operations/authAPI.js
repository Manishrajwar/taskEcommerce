import { toast } from "react-hot-toast";

import {  setToken, setUser } from "../../reducer/slices/authSlice";
import { endpoints } from "../apis";
import {
  makeUnauthenticatedPOSTRequest
} from "../serverHelper";

const {LOGIN_API} = endpoints;


// ! login
export function login(formData, navigate) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await makeUnauthenticatedPOSTRequest(
        LOGIN_API,
        formData
      );
      
      localStorage.setItem("token", JSON.stringify(response.token));
      localStorage.setItem("userDetail", JSON.stringify(response));
      dispatch(setToken(response.token));
      dispatch(setUser(response));
      navigate("/")
      toast.success("Successfuly login");

    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    toast.dismiss(toastId);
  };
}
