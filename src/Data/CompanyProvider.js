import client from "../HHTP/client";

export default class CompanyProvider {

    static async createCompany (body){
        return await client.post("/company/create", body);
    }
    static async updateCompany (body){
        return await client.post("/company/update", body);
    }
    
    static async getAllCompany() {
        return await client.get(`/company/get/all`);
    }

    static async deleteCompany(id) {
        return await client.delete(`/company/delete/${id}`);
    }
}
