import client from "../HHTP/client";

export default class LabaratoryProvider {
    static async createLaboratory (body){
        return await client.post("/seo/laboratory/create", body);
    }
    
    static async updateLaboratory (body){
        return await client.put("/seo/laboratory/update", body);
    }
    
    static async getAllLaboratory() {
        return await client.get(`/seo/laboratory/get/all`);
    }

    static async deleteLaboratory(id) {
        return await client.delete(`/seo/laboratory/delete/${id}`);
    }
}
