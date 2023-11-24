import client from "../HHTP/client";

export default class ParasitologyResultProvider {
    static async createResultParasite (body){
        return await client.post(`/result/parasite/create`, body);
    }
    
    static async updateResultParasite (body){
        return await client.put(`/result/parasite/update`, body);
    }
    
    static async getResultParasite(id) {
        return await client.get(`/result/parasite/get/${id}}`);
    }
    
    static async getResultParasiteByPatientId(patientId, orderId ) {
        return await client.get(`/result/parasite/get/data/by/patient/and/order?patientId=${patientId}&orderDetailId=${orderId}`);
    }

    static async deleteResultParasite(id) {
        return await client.delete(`/result/parasite/delete/${id}`);
    }
}
