import client from "../HHTP/client";

export default class SanMinProvider {

    static async createSanMin (body){
        return await client.post("/san-minimum/create", body);
    }
    static async updateSanMin (body){
        return await client.put("/san-minimum/update", body);
    }
    
    static async getAllSanMin() {
        return await client.get(`/san-minimum/get/all`);
    }

    static async getAllSanMinBody(contractInfoFilterDTO) {
        return await client.post(`/san-minimum/get/all/filter`, contractInfoFilterDTO);
    }

    static async changePaymentStatus(sanMinimumId, paymentStatus) {
        return await client.get(`/san-minimum/change/payment-status?sanMinimumId=${sanMinimumId}&paymentStatus=${paymentStatus}`);
    }

    static async deleteSanMin(id) {
        return await client.delete(`/san-minimum/delete/${id}`);
    }

    static async downloadExcel(body) {
        try {
          const response = await client.post(
            `/san-minimum/export/excel`, body ,
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
