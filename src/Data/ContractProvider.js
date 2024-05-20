import client from "../HHTP/client";

export default class ContractProvider {

    static async createContract (body){
        return await client.post("/contract/create", body);
    }
    static async updateContract (body){
        return await client.put("/contract/update", body);
    }
    
    static async getAllContract() {
        return await client.get(`/contract/get/all`);
    }

    static async getAllContractBody(contractInfoFilterDTO) {
        return await client.post(`/contract/get/all/filter`, contractInfoFilterDTO);
    }

    static async changePaymentStatus(contractId, paymentStatus) {
        return await client.get(`/contract/change/payment-status?contractId=${contractId}&paymentStatus=${paymentStatus}`);
    }

    static async deleteContract(id) {
        return await client.delete(`/contract/delete/${id}`);
    }

    static async downloadExcel(body) {
        try {
          const response = await client.post(
            `/contract/export/excel`, body ,
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
