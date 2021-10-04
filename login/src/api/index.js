import axios from 'axios';

const signUp = (formData) => axios.post("/api/save_details/signup", formData);
const login = (formData) => axios.post("/api/auth", formData);
const verifyOtp = (formData) => axios.post("/api/save_details/verifyotp", formData);

export {signUp,login,verifyOtp};