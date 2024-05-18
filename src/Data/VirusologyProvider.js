import client from "../HHTP/client";

export default class VirusologyProvider {
  static async createVirus(body) {
    return await client.post("/seo/virus/create", body);
  }

  static async updateVirus(body) {
    return await client.put("/seo/virus/update", body);
  }

  static async getAllVirus() {
    return await client.get(`/seo/virus/get/all`);
  }

  static async deleteVirus(id) {
    return await client.delete(`/seo/virus/delete/${id}`);
  }
  //result
  static async createResultVirusologyAnalysis(body) {
    return await client.post(`/result-virology-analysis/save`, body);
  }
  static async getResulVirusologyByPatientId(patientId, orderId) {
    return await client.get(
      `/result-virology-analysis/get/data?patientId=${patientId}&orderDetailId=${orderId}`
    );
  }
}
