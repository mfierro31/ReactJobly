import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static setToken(jwt) {
    this.token = jwt;
  }

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    } catch(e) {
      return e;
    }
  }

  // Get all companies, with optional company name filter

  static async getCompanies(query = "") {
    let res;
    
    if (query) {
      res = await this.request(`companies`, { name: query });
    } else {
      res = await this.request(`companies`);
    }
    
    return res.companies;
  }

  // Get all jobs, with optional job title filter

  static async getJobs(query = "") {
    let res;
    
    if (query) {
      res = await this.request(`jobs`, { title: query });
    } else {
      res = await this.request(`jobs`);
    }
    
    return res.jobs;
  }

  // Retrieves a user's token with username and password data, sets JoblyApi.token to this token

  static async getToken(data) {
    try {
      const res = await this.request('auth/token', data, 'post');
      this.token = res.token;
      return res.token;
    } catch(e) {
      return e;
    }
  }

  // Gets a user, returns an error if not found or not authorized

  static async getUser(username) {
    try {
      const res = await this.request(`users/${username}`);
      return res.user;
    } catch(e) {
      return e;
    }
  }

  // sets JoblyApi.token to an empty string

  static deleteToken() {
    this.token = "";
  }

  // Sign up a user and set the token

  static async signup(data) {
    try {
      const res = await this.request('auth/register', data, 'post');
      this.token = res.token;
      return res.token;
    } catch(e) {
      return e;
    }
  }

  // Updates a user's info

  static async update(data) {
    const { username, password, firstName, lastName, email } = data;
    const loginInfo = { username, password };

    try {
      await this.request('auth/token', loginInfo, 'post');

      const res = await this.request(`users/${username}`, { firstName, lastName, email }, 'patch');

      return res.user;
    } catch(e) {
      return e;
    }
  }

  // apply to a job

  static async apply(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, 'post');
  }
}

export default JoblyApi;