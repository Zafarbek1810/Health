import client from "../HHTP/client";

export default class DistrictProvider {
    static async createDistrict (body){
        return await client.post("/seo/district/create", body);
    }
    
    static async updateDistrict (body){
        return await client.post("/seo/district/update", body);
    }
    
    static async getAllDistrict() {
        return await client.get(`/seo/district/get/all`);
    }

    static async getDistrictByRegionId(id) {
        return await client.get(`/seo/district/get/district/by-region?regionId=${id}`);
    }

    static async deleteDistrict(id) {
        return await client.delete(`/seo/district/delete/${id}`);
    }
}
