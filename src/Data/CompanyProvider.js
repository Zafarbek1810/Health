import client from "../HHTP/client";

export default class CompanyProvider {

    static async createCompany (body){
        return await client.post("/v1/company/create", body);
    }
    static async updateCompany (body){
        return await client.post("/v1/company/update", body);
    }
    
    static async getAllCompany() {
        return await client.get(`/v1/company/get/all`);
    }

    static async deleteCompany(id) {
        return await client.delete(`/v1/company/delete/${id}`);
    }
}
