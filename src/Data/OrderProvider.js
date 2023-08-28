import client from "../HHTP/client";

export default class OrderProvider {

    static async createOrder (id){
        return await client.post(`/order/create/${id}`);
    }
    static async saveDetailOrder (body){
        return await client.post("/order/save/detail", body);
    }
    
    static async getAllOrders() {
        return await client.get(`/order/get/data`);
    }
    static async getOrdersById(id) {
        return await client.get(`/order/get/detail/data?orderId=${id}`);
    }

    static async deleteOrder(id) {
        return await client.delete(`/order/delete/${id}`);
    }
}
