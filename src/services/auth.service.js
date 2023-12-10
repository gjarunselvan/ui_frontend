import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password, firstName, lastName, roles, gender, phone, no, street1, street2, city, pincode) => {
  return axios.post(API_URL + "signup", { 
    username,
    email,
    password,
    firstName,
    lastName,
    roles,
    gender,
    phone,
    no,
    street1,
    street2,
    city,
    pincode
  });
};
const login = (email, password) => {
  let userCookie1;

  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      //alert(response.data);
      //alert(response.headers.data);
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      userCookie1 = response.data.token; // Assign the cookie value to the variable
     //alert(localStorage.getItem('user'));
     Cookies.set('userCookie', userCookie1, {
      expires: 1, // Expires in 1 day
      secure: true, // Cookie is only sent over HTTPS
      sameSite: 'None', // Allows cross-site access
     
      });

    // Cookies.remove('userCookie', response.data.token, {
    //   //expires: 1, // Expires in 1 day
    //   secure: true, // Cookie is only sent over HTTPS
    //   sameSite: 'None', // Allows cross-site access
     
    //   });

      return response.data;
      
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "signout").then((response) => {
  Cookies.remove('userCookie', response.data.token, {
    //   //expires: 1, // Expires in 1 day
    secure: true, // Cookie is only sent over HTTPS
     sameSite: 'None', // Allows cross-site access
     
   });
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
