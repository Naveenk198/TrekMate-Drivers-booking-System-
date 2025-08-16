import axios from "axios"
import App from "../App"

const API_URl="http://localhost:8080/api/customers/orders"
 
class OrderService{
    showallorder(){
        return axios.get(API_URl)
    }
    saveorder(order){
        return axios.post(API_URl,order)
    }
    getorderbyid(id){
        return axios.get(`${API_URl}/${id}`)
    }
    deleteorderbyid(orderId){
        return axios.delete(`${API_URl}/${orderId}`)
    }

}
export default new OrderService;