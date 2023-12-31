import client from "../HHTP/client";

export default class AntibioticProvider {
    static async createAntibiotic (body){
        return await client.post("/seo/antibiotic/create", body);
    }
    
    static async updateAntibiotic (body){
        return await client.put("/seo/antibiotic/update", body);
    }
    
    static async getAllAntibiotic() {
        return await client.get(`/seo/antibiotic/get/all`);
    }

    static async deleteAntibiotic(id) {
        return await client.delete(`/seo/antibiotic/delete/${id}`);
    }


    //result
    static async addAntibioticResult (body){
        return await client.post("/sensitivity/save", body);
    }

    static async getAntibioticByPatientId (patientId, orderId){
        return await client.get(`/sensitivity/get/data?patientId=${patientId}&orderDetailId=${orderId}`);
    }


}
