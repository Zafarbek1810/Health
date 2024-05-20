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
  static async getShablonId(analysisId) {
    return await client.get(`/seo/analysis/get/${analysisId}`);
  }
  static async getAllAnalysisByLabWithPrice(id) {
    return await client.get(`/seo/analysis-price/get/by/${id}`);
  }

  static async deleteAnalysis(id) {
    return await client.delete(`/seo/analysis/delete/${id}`);
  }

  static async getPdfAnalysis(isCyrillic, patientId, orderDetailId) {
      try {
        const response = await client.get(
          `/pdf/get-analysis-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
          {
            responseType: "blob",
          }
        );
    
        return response;
      } catch (err) {
        return Promise.reject(err);
      }
  }
  static async getPdfDisbakterioz(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-dysbacteriosis-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  
  static async getPdfBacteriology(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-bacteriology-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getPdfBloodPurity(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-blood-purity-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async getPdfBreastMilk(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-breast-milk-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async getPdfHemoCulture(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-hemo-culture-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async getPdfMicrobiological(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-microbiological-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async getPdfHepatits(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-hepatitis-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
  static async getVirusologyAnalysis(isCyrillic, patientId, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-virology-analysis-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }





  static async getChequeAnalysis(isCyrillic, orderDetailId) {
    try {
      const response = await client.get(
        `/pdf/get-cheque-pdf?isCyrillic=${isCyrillic}&orderDetailId=${orderDetailId}`,
        {
          responseType: "blob",
        }
      );
  
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  }
  
  // static async getPdfDisbakterioz(isCyrillic, patientId, orderDetailId) {
  //   try {
  //     const response = await client.get(
  //       `/pdf/get-dysbacteriosis-pdf?isCyrillic=${isCyrillic}&patientId=${patientId}&orderDetailId=${orderDetailId}`,
  //       {
  //         responseType: "blob",
  //       }
  //     );
  
  //     return response;
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // }
}
