import client from "../HHTP/client";

export default class AnalizProvider {
    static async createAnalysis(body) {
        return await client.post("/seo/analysis/create", body);
    }

    static async updateAnalysis(body) {
        return await client.post("/seo/analysis/update", body);
    }

    static async getAllAnalysis(page, size) {
        return await client.get(`/seo/analysis/get/all?page=${page}&size=${size}`);
    }
    static async getAllAnalysisByLab(id) {
        return await client.get(`/seo/analysis/get/all/by/lab?laboratoryId=${id}`);
    }
    static async getAllAnalysisByLabWithPrice(id) {
        return await client.get(`/seo/analysis-price/get/by/${id}`);
    }

    static async deleteAnalysis(id) {
        return await client.delete(`/seo/analysis/delete/${id}`);
    }

    static async getPdfAnalysis(isCyrillic, patientId, orderDetailId) {
        return await client.post(`/pdf/get-analysis-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
            {
                headers: { 'Content-Type': 'application/pdf' }
            }, { responseType: 'blob' })
            .then((response) => {
                return response;
            }
            ).catch((err) => {
                return Promise.reject(err);
            });
    }

}
