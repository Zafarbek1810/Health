import client from "../HHTP/client";

export default class RegionProvider {

    static async createRegion (body){
        return await client.post("/region/create", body);
    }
    
    static async updateRegion (body){
        return await client.post("/region/update", body);
    }
    
    static async getAllRegion() {
        return await client.get(`/region/get/all`);
    }

    static async deleteRegion(id) {
        return await client.delete(`/region/delete/${id}`);
    }
}
