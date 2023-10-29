import axios from "axios"
const backendUrl = 'http://127.0.0.1:5173';
export const loginRequest = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${backendUrl}/login`, { email, password });
    const userEmail: string = res.data;
    window.localStorage.setItem('token', userEmail);
    return "OK";
  } catch (error) {
    console.log(error);
  }

};

export const signUpRequest = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${backendUrl}/create-user`, { email, password });
    const userEmail: string = res.data;
    window.localStorage.setItem('token', userEmail);
    return "OK";
  } catch (error) {
    console.log(error);
  }

};

export const getUserData = async () => {
  try {
    const email = window.localStorage.getItem('token');
    const res = await axios.get(`${backendUrl}/get-user-data/${email}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }

};

export const createBreakfast = async (breakfast: string) => {
  try {
     await axios.post(`${backendUrl}/create-user-data`, { breakfast, email: window.localStorage.getItem('token') });
    return "OK";
  } catch (error) {
    console.log(error);
  }

};

export const createLunch = async (lunch: string) => {
  try {
     await axios.post(`${backendUrl}/create-user-data`, { lunch, email: window.localStorage.getItem('token') });
    return "OK";
  } catch (error) {
    console.log(error);
  }

};

export const createDinner = async (dinner: string) => {
  try {
     await axios.post(`${backendUrl}/create-user-data`, { dinner, email: window.localStorage.getItem('token') });
    return "OK";
  } catch (error) {
    console.log(error);
  }

};

export const createSnack = async (snacks: string) => {
  try {
     await axios.post(`${backendUrl}/create-user-data`, { snacks, email: window.localStorage.getItem('token') });
    return "OK";
  } catch (error) {
    console.log(error);
  }

};

export const createConfiguraiton = async (allergies: string, age: number, weight: number, height: string, gender: string, activity_level:string, target_nutrition_goal: string, medications: string) => {
  try {
     await axios.post(`${backendUrl}/create-user-data`, { allergies, email: window.localStorage.getItem('token') });
     await axios.post(`${backendUrl}/create-user-data`, { age, email: window.localStorage.getItem('token') });
     await axios.post(`${backendUrl}/create-user-data`, { weight, email: window.localStorage.getItem('token') });
     await axios.post(`${backendUrl}/create-user-data`, { height, email: window.localStorage.getItem('token') });
     await axios.post(`${backendUrl}/create-user-data`, { gender, email: window.localStorage.getItem('token') });
     await axios.post(`${backendUrl}/create-user-data`, { activity_level, email: window.localStorage.getItem('token') });
     await axios.post(`${backendUrl}/create-user-data`, { target_nutr_goal: target_nutrition_goal, email: window.localStorage.getItem('token') });
     await axios.post(`${backendUrl}/create-user-data`, { medications, email: window.localStorage.getItem('token') });
    return "OK";
  } catch (error) {
    console.log(error);
  }

};