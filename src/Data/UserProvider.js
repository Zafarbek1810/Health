import client from "../HHTP/client";

export default class UserProvider {

    static async getMe() {
        return await client.get(`/auth/me`);
    }
    
    static async createUser (body){
        return await client.post("/seo/user/register", body);
    }
    static async updateUser (body){
        return await client.put("/seo/user/update", body);
    }
    
    static async getAllUsers() {
        return await client.get(`/seo/user/get/all`);
    }

    static async deleteUser(id) {
        return await client.delete(`/seo/user/delete/${id}`);
    }
}
