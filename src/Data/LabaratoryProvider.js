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

    static async getAllSumm(fromDate, toDate) {
        const params={fromDate, toDate};
        return await client.get(`/dashboard/get/all/sum`, {params});
    }
    static async getSummSevenDay() {
        return await client.get(`/dashboard/get/last/seven-day`);
    }
    static async getSummTenDay() {
        return await client.get(`/dashboard/get/last/ten-day`);
    }
    static async getSummTenDayAnalysis() {
        return await client.get(`/dashboard/get/last/ten-day/analysis`);
    }
    static async getSummTenDayPatient() {
        return await client.get(`/dashboard/get/last/ten-day/patient`);
    }
}
