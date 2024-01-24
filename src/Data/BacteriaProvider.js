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

    static async createResultBloodPurity (body){
        return await client.post(`/blood-purity/save`, body);
    }
    static async getResulBloodPurityByPatientId(patientId, orderId ) {
        return await client.get(`/blood-purity/get/data?patientId=${patientId}&orderDetailId=${orderId}`);
    }
    static async createResultBreastMilk (body){
        return await client.post(`/breast-milk/save`, body);
    }
    static async getResulBreastMilkByPatientId(patientId, orderId ) {
        return await client.get(`/breast-milk/get/data?patientId=${patientId}&orderDetailId=${orderId}`);
    }

    static async createResultHemoCulture (body){
        return await client.post(`/hemo-culture/save`, body);
    }
    static async getResulHemoCultureByPatientId(patientId, orderId ) {
        return await client.get(`/hemo-culture/get/data?patientId=${patientId}&orderDetailId=${orderId}`);
    }
}
