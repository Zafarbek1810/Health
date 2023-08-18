import client from "../HHTP/client";

class AuthProvider{
  static async login (body){
    return await client.post("/auth/login", body);
  }

  static async getMe (){
    return await client.get("/auth/me");
  }
}

export default AuthProvider;