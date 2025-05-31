import { useContext, useEffect } from "react";
import ApiService from "../Services/ApiService";
import { UserContext } from "./user";

export const updateUserContext = () => {

    const user = useContext(UserContext);
    
    useEffect(() => {
       const updateContext = async () => {
         try {
           const response = await ApiService.getUserProfile();
           
           if (response.statusCode === 200) {
             user.setUser({ name: response.user.name, username: response.user.username, role: response.user.role, email: response.user.email });
           }
   
         } catch (error) {
           console.log("user context failed :",error);
           if (error.message.slice(-3) == 403) {
             ApiService.logout();
           }
         }
       }
       if (user.user.username == '') {
         updateContext();
       }
     }, [])
}