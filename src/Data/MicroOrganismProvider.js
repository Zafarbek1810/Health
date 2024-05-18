import client from "../HHTP/client";

export default class MicroOrganismProvider {
    static async createMicroorganism (body){
        return await client.post("/seo/microorganism/create", body);
    }
    
    static async updateMicroorganism (body){
        return await client.put("/seo/microorganism/update", body);
    }
    
    static async getAllMicroorganism() {
        return await client.get(`/seo/microorganism/get/all`);
    }

    static async deleteMicroorganism(id) {
        return await client.delete(`/seo/microorganism/delete/${id}`);
    }


    //result
    static async createResultMicroorganism (body){
        return await client.post(`/result-microbiological-examination/save`, body);
    }
    static async getResulMicroorganismByPatientId(patientId, orderId ) {
        return await client.get(`/result-microbiological-examination/get/data?patientId=${patientId}&orderDetailId=${orderId}`);
    }
}
