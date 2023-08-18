import client from "../HHTP/client";

export default class DistrictProvider {
    static async createDistrict (body){
        return await client.post("/v1/district/create", body);
    }
    
    static async updateDistrict (body){
        return await client.post("/v1/district/update", body);
    }
    
    static async getAllDistrict() {
        return await client.get(`/v1/district/get/all`);
    }

    static async deleteDistrict(id) {
        return await client.delete(`/v1/district/delete/${id}`);
    }
}
