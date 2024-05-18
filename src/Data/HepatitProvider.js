import client from "../HHTP/client";

export default class HepatitProvider {
    static async createHepatits (body){
        return await client.post("/hepatitis/create", body);
    }
    
    static async updateHepatits (body){
        return await client.put("/hepatitis/update", body);
    }
    
    static async getAllHepatits() {
        return await client.get(`/hepatitis/get/all`);
    }

    static async deleteHepatits(id) {
        return await client.delete(`/hepatitis/delete/${id}`);
    }


    //result
    static async createResultHepatits (body){
        return await client.post(`/result-hepatitis/save`, body);
    }
    static async getResulHepatitsByPatientId(patientId, orderId ) {
        return await client.get(`/result-hepatitis/get/data?patientId=${patientId}&orderDetailId=${orderId}`);
    }
}
