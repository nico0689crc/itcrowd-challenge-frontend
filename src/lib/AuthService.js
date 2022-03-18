import { QueryService } from "./QueryService";
import API_ENDPOINTS from "../utils/endpoints";

class Auth extends QueryService {
  async login(input) {
    return this.http.post(API_ENDPOINTS.LOGIN, input).then(res => res.data);
  }
}

export const AuthService = new Auth(API_ENDPOINTS.USERS);
