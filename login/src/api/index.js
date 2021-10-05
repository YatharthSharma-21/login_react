import axios from 'axios';

const signUp = (formData) => axios.post("/api/save_details/signup", formData);
const login = (formData) => axios.post("/api/auth", formData);
const verifyOtp = (formData) => axios.post("/api/save_details/verifyotp", formData);
const verifyUSer = (formData) => axios.post("/api/save_details/verifyUser", formData, {
  headers: {
    Authorization: 'Bearer ' + formData
  }
});

const updateUser = (formData,token) => axios.post("/api/save_details/updateUser", formData, {
  headers: {
    Authorization: 'Bearer ' + token
  }
});

export { signUp, login, verifyOtp, verifyUSer, updateUser };