import axios from "axios";
const API_URl="http://localhost:8080/api/customers"

class CustomerService{
    getallcustomer(){
       return axios.get(API_URl) 
    }
    savecustomer(customer){
        return axios.post(API_URl,customer)
    }
    getcustomerbyid(id){
        return axios.get(`${API_URl}/${id}`)
    }
    updatecustomer(id,customer){
        return axios.put(`${API_URl}/${id}`,customer)
    }
    deletecustomer(id){
        return axios.delete(`${API_URl}/${id}`)
    }
    login(customer){
        return axios.post(`${API_URl}/login`,customer)
    }
}
export default new CustomerService;