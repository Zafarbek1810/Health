import client from "../HHTP/client";

export default class PatientProvider {

    static async createPatient (body){
        return await client.post("/patient/create", body);
    }
    static async updatePatient (body){
        return await client.put("/patient/update", body);
    }
    
    static async getAllPatient(keyword, page, size) {
        return await client.get(`/patient/get/data/by/company?keyword=${keyword}&page=${page}&size=${size}`);
    }
    
    static async getOnePatient(id) {
        return await client.get(`/patient/get/${id}`);
    }

    static async deletePatient(id) {
        return await client.delete(`/patient/delete/${id}`);
    }

    static async getPatientStatistic() {
        return await client.get(`patient/get/patient-count`);
    }
}
