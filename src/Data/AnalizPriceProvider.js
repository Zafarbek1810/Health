import client from "../HHTP/client";

export default class AnalizPriceProvider {
    static async createAnalysisPrice (body){
        return await client.post("/seo/analysis-price/create", body);
    }
    
    static async updateAnalysisPrice (body){
        return await client.put("/seo/analysis-price/update", body);
    }
    
    static async getAllAnalysisPrice() {
        return await client.get(`/seo/analysis-price/get/all`);
    }
    
    static async deleteAnalysisPrice(id) {
        return await client.delete(`/seo/analysis-price/delete/${id}`);
    }
    
    static async getAllPrices (body){
        return await client.post("/seo/analysis-price/get/all-prices", body);
    }
    static async getDefaultPrice(orderId ) {
        return await client.get(`/seo/analysis-price/get/all-prices/by-order?orderId=${orderId}`);
    }
}
