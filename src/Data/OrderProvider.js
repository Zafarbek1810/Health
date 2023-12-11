import client from "../HHTP/client";

export default class OrderProvider {

    static async createOrder (id){
        return await client.post(`/order/create/${id}`);
    }
    static async saveDetailOrder (body){
        return await client.post("/order/save/detail", body);
    }
    
    static async orderConfirm (orderId){
        return await client.post(`/order/confirm?orderId=${orderId}`);
    }

    static async orderCancel (orderId){
        return await client.post(`/order/cancel?orderId=${orderId}`);
    }

    static async orderReject (orderId){
        return await client.post(`/order/reject?orderId=${orderId}`);
    }
    
    static async getAllOrders(pageNum, pageSize) {
        return await client.get(`/order/get/data?pageNum=${pageNum}&pageSize=${pageSize}`);
    }
    static async getAllAnalysisStatus(pageNum, pageSize) {
        return await client.get(`/order/get/all/analysis-status?pageNum=${pageNum}&pageSize=${pageSize}`);
    }
    static async getOrdersById(id) {
        return await client.get(`/order/get/detail/data?orderId=${id}`);
    }
    static async getLaborantStatistika() {
        return await client.get(`/order/get/laborant-stat/data`);
    }
    
    static async deleteOrder(id) {
        return await client.delete(`/order/delete/${id}`);
    }

    static async updateOrder( body) {
        return await client.put(`/order/update/detail`, body);
    }

    static async getCurrencyDashboard() {
        return await client.get(`/order/general/statistics`);
    }

    static async getGeneralData(fromDate, toDate){
        return await client.get(`/dashboard/get/data?fromDate=${fromDate}&toDate=${toDate}`)
    }

    static async changePaymentStatus (body){
        return await client.post(`/order/change/payment-status` , body);
    }

    static async changeAnalizStatus (orderDetailId, analysisStatus){
        return await client.post(`/order/change/analysis-result-status?orderDetailId=${orderDetailId}&analysisStatus=${analysisStatus}`);
    }
}
