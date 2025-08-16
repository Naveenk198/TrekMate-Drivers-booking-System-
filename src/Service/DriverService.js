import axios from 'axios';

const API_URl="http://localhost:8080/api/drivers"

class DriversService {
   getalldrivers(){
    return axios.get(API_URl);
   }
   SaveDriver(driver){
    return axios.post(API_URl,driver);
   }
   getavailabledriver(){
      return axios.get(`${API_URl}/available `)
   }
   getDriverByid(id){
    return axios.get(`${API_URl}/${id}`);
   }
   updatedriver(id ,driver){
    return axios.put(`${API_URl}/${id}`,driver)
   }
   Deletedriver(id){
    return axios.delete(`${API_URl}/${id}`)
   }
   login(driver){
      return axios.post(`${API_URl}/login`,driver)
   }
}
export default new DriversService;