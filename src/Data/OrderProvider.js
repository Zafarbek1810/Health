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
    
    static async getAllOrders(pageNum = 0, pageSize = 20, keyword, paymentType, paymentStatus) {
        const params={pageNum, pageSize,  keyword, paymentType, paymentStatus};
        return await client.get(`/order/get/data`, {params});
    }
    static async getAllAnalysisStatus(orderInfoFilterDTO) {
        return await client.post(`/order/get/all/analysis-status`, orderInfoFilterDTO);
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


    // static async downloadExcel (body){
    //     return await client.post(`/order/export-to-excel`, body);
    // }

    static async downloadExcel(body) {
        try {
          const response = await client.post(
            `/order/export-to-excel`, body ,
            {
              responseType: "blob",
            }
          );
      
          return response;
        } catch (err) {
          return Promise.reject(err);
        }
    }
}
