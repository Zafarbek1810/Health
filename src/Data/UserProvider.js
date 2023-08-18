import client from "../HHTP/client";

export default class UserProvider {

    static async getMe() {
        return await client.get(`/auth/me`);
    }
    
    static async createUser (body){
        return await client.post("/user/register", body);
    }
    static async updateUser (body){
        return await client.put("/user/update", body);
    }
    
    static async getAllUsers() {
        return await client.get(`/user/get/all`);
    }

    static async deleteUser(id) {
        return await client.delete(`/user/delete/${id}`);
    }
}
