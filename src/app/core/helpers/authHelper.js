import JwtHelper from "./jwtHelper";

const strategies = {
  JWT: JwtHelper,
  __default__: JwtHelper,
};

class DynamicAuth {
  constructor(type) {
    const currentAuth = strategies[type];
    Object.setPrototypeOf(DynamicAuth.prototype, new currentAuth());
  }
}

// tslint:disable-next-line: max-classes-per-file
export default class AuthHelper extends DynamicAuth {
  constructor(type = "JWT") {
    super(type);
  }

  defaultHeader() {
    if (super.defaultHeader) {
      return super.defaultHeader();
    }
    // default code here
  }

  getAuthHeader() {
    if (super.getAuthHeader) {
      return super.getAuthHeader();
    }
    // default code here
  }

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

    if (super.isValidToken) {
      return super.isValidToken();
    }
    return false;
    // default code here
  }

  setAuthHeader(request) {
    // Get and check access token
    if (this.getToken()) {
      // Normal case: Request with authorization
      Object.assign(request.headers, this.getAuthHeader());
    }
    return request;
  }

  /**
   * Handle refresh token with current API request
   * @method handleRefreshToken
   * @param   [request] - current API request that have expired access_token or get 401 Unauthorized
   * @returns Promise<AxiosRequestConfig>
   */
  handleRefreshToken(request) {
    // TODO: handle refresh token
    return null;
  }
}
