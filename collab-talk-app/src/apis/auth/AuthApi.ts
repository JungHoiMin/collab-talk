import {axiosInstance} from "@apis/AxiosInstance";
import {store} from "@stores/Store";
import {setAlarmList, setBadge} from "@stores/AlarmSlice";

export const checkEmailDuplication = async (email: string) => {
  const response = await axiosInstance.get(`/collaborator/check/email/${email}`);
  return response.data;
}

export const checkPhoneNumberDuplication = async (phone_number: string) => {
  const response = await axiosInstance.get(`/collaborator/check/phone_number/${phone_number}`);
  return response.data;
}

export const signup = async (email: string, name: string, password: string, phone_number: string) => {
  const data = {email, name, password, phone_number};
  const response = await axiosInstance.post('collaborator/signup', data);
  return response.data;
}

export const login = async (email: string, password: string) => {
  const data = {email, password};
  const response = await axiosInstance.post('collaborator/login', data);
  return response.data;
}

export const getAlarmList = () => {
  axiosInstance.get('custom-sse')
    .then((res) => {
      store.dispatch(setBadge(res.data))
    })
  axiosInstance.get('alarm')
    .then((res) => {
      store.dispatch(setAlarmList(res.data))
    })
}