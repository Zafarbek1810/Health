import client from "../HHTP/client";

export default class PatientProvider {

    static async createPatient (body){
        return await client.post("/patient/create", body);
    }
    static async updatePatient (body){
        return await client.put("/patient/update", body);
    }
    
    static async getAllPatient() {
        return await client.get(`/patient/get/data/by/company`);
    }
    
    static async getOnePatient(id) {
        return await client.get(`/patient/get/${id}`);
    }

    static async deletePatient(id) {
        return await client.delete(`/patient/delete/${id}`);
    }
}
