import * as jwt from "jsonwebtoken";
import { AuthStorageService } from "../services/authStorage.service";

export default class JwtHelper extends AuthStorageService {
  defaultHeader = () => ({
    // TODO: make default jwt header
  });

  getAuthHeader = () => ({
    Authorization: `Bearer ${this.getToken()}`,
  });

  /**
   * Token conditions: custom checking access token
   * @method isValidToken
   * @return {boolean}    `true` : valid token for calling API
   *                      `false`: need to refresh access_token
   */
  isValidToken() {
    /**
     * Adding conditions here
     */
    // TODO

    // Default return
    return this._verifyJWTToken().isTokenValid;
  }

  isAuthenticated() {
    const { isTokenValid } = this._verifyJWTToken();
    return isTokenValid;
  }

  isCurrentUser(uid) {
    const userInfo = this.getUserInfo();
    return userInfo ? uid === userInfo.uid : false;
  }

  userRole() {
    const userInfo = this.getUserInfo();
    return userInfo ? userInfo.role : undefined;
  }

  getUserInfo() {
    const { isTokenValid, token } = this._verifyJWTToken();
    if (isTokenValid && typeof isTokenValid === "object") {
      return isTokenValid;
    }
  }

  getUserId() {
    const { isTokenValid, token } = this._verifyJWTToken();
    if (isTokenValid && typeof isTokenValid === "object") {
      return isTokenValid._id;
    }
  }

  _verifyJWTToken() {
    const token = this.getToken();
    const isTokenValid = jwt.decode(token);
    if (!isTokenValid) {
      this.removeToken();
    }
    return { isTokenValid, token };
  }
}
