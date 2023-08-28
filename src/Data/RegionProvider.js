import client from "../HHTP/client";

export default class RegionProvider {

    static async createRegion (body){
        return await client.post("/seo/region/create", body);
    }
    
    static async updateRegion (body){
        return await client.post("/seo/region/update", body);
    }
    
    static async getAllRegion() {
        return await client.get(`/seo/region/get/all`);
    }

    static async deleteRegion(id) {
        return await client.delete(`/seo/region/delete/${id}`);
    }
}
