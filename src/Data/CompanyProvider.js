import client from "../HHTP/client";

export default class CompanyProvider {

    static async createCompany (body){
        return await client.post("/seo/company/create", body);
    }
    static async updateCompany (body){
        return await client.post("/seo/company/update", body);
    }
    
    static async getAllCompany() {
        return await client.get(`/seo/company/get/all`);
    }

    static async deleteCompany(id) {
        return await client.delete(`/seo/company/delete/${id}`);
    }
}
