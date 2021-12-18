import AuthHelper from "../helpers/authHelper";
import { ENDPOINT } from "../../../config/endpoint";
import { ApiService } from "./api.service";

export class AuthService extends AuthHelper {
  http = new ApiService();

  constructor() {
    super();
  }

  async signIn(body) {
    /* this is the default signIn,
      If you want to override it, please write the same function in specific type of auth.
    */
    return this.http.post([ENDPOINT.auth.login], body);
  }
  async signInAdmin(body) {
    /* this is the default signIn,
      If you want to override it, please write the same function in specific type of auth.
    */
    return this.http.post([ENDPOINT.admin.index, "login"], body);
  }

  async registerCustomer(body) {
    return this.http.post([ENDPOINT.auth.registerCustomer], body);
  }
  async registerStaff(body) {
    return this.http.post([ENDPOINT.auth.registerStaff], body);
  }
}
