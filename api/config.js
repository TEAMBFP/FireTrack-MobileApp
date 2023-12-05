import Axios from 'axios';
import { getToken } from '../lib/TokenHandler';
import { Platform } from 'react-native';


const baseURL = Platform.OS === 'android' ?
 'http://10.0.2.2:8000/api' 
 : 
 'http://localhost:8000/api'

const apiService =  Axios.create({
  baseURL: baseURL,
});


apiService.interceptors.request.use(
  async function  (config)  {
    const token = await getToken()
    if (token) {
      config.headers = {
        'Authorization': 'Bearer '+token,
        'Accept':'application/json'
      }
    }
    return config
  },
  function (error)  {
    Promise.reject(error)
  }
);


export default apiService;