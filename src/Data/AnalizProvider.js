import client from "../HHTP/client";

export default class AnalizProvider {
    static async createAnalysis (body){
        return await client.post("/seo/analysis/create", body);
    }
    
    static async updateAnalysis (body){
        return await client.post("/seo/analysis/update", body);
    }
    
    static async getAllAnalysis() {
        return await client.get(`/seo/analysis/get/all`);
    }
    static async getAllAnalysisByLab(id) {
        return await client.get(`/seo/analysis/get/all/by/lab?laboratoryId=${id}`);
    }

    static async deleteAnalysis(id) {
        return await client.delete(`/seo/analysis/delete/${id}`);
    }
}
