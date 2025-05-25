import axios from "axios";
import type { IUser, ICredentials, IRegistrationData} from './types'

const baseURL = 'http://localhost:5000/api/';



//for useQuery
// anyway returns user data or null so we know he's not authenticated
export const checkAuth = async (): Promise<IUser | null> => {
  try {
    const response = await axios.get<{ user?: IUser; error?: string }>(
      `${baseURL}check_auth`,
      { withCredentials: true }
    );
    return response.data.user || null;
  } catch (error) {
    return null;
  }
};

//for useMutate

//should return a logged user data or an error from backend
export const login = async (credentials: ICredentials): Promise<IUser> => {
  const response = await axios.post<{ user: IUser; error?: string }>(
    `${baseURL}login`,
    credentials,
    { withCredentials: true }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.user;
};
//should return a registered/logged user data or an error from backend
export const register = async (data: IRegistrationData): Promise<IUser> => {
  const response = await axios.post<{ user: IUser; error?: string}>(
    `${baseURL}register`,
    data,
    { withCredentials: true }
  );
  if (response.data.error) {
    throw new Error(response.data.error);
  }
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await axios.post(`${baseURL}logout`, {}, { 
    withCredentials: true 
  });
};