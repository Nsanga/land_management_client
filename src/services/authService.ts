import axios from "axios";

export const registerUserService = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization?: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  accountType: string;
  role: string;
}) => {
  const response = await axios.post(
    "https://land-management-backend-app.onrender.com/api/auth/register",
    data
  );
  return response.data;
};

export const loginUserService = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    "https://land-management-backend-app.onrender.com/api/auth/login",
    data
  );
  return response.data;
};
