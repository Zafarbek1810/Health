import client from "../HHTP/client";

export default class BacteriaProvider {
    static async createBacteria (body){
        return await client.post("/seo/bacteria/create", body);
    }
    
    static async updateBacteria (body){
        return await client.put("/seo/bacteria/update", body);
    }
    
    static async getAllBacteria() {
        return await client.get(`/seo/bacteria/get/all`);
    }

    static async deleteBacteria(id) {
        return await client.delete(`/seo/bacteria/delete/${id}`);
    }


    //result
    static async createResultDisbakterioz (body){
        return await client.post(`/intestinal/save`, body);
    }
    static async getResulDisbakteriozByPatientId(patientId, orderId ) {
        return await client.get(`/intestinal/get/data?patientId=${patientId}&orderDetailId=${orderId}`);
    }
}
