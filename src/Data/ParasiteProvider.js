import client from "../HHTP/client";

export default class ParasiteProvider {
    static async createParasite (body){
        return await client.post("/seo/parasite/create", body);
    }
    
    static async updateParasite (body){
        return await client.put("/seo/parasite/update", body);
    }
    
    static async getAllParasite() {
        return await client.get(`/seo/parasite/get/all`);
    }

    static async deleteParasite(id) {
        return await client.delete(`/seo/parasite/delete/${id}`);
    }
}
