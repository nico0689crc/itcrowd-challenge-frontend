import { createAxiosRequest } from "./axios.js";

export class QueryService {
  constructor(basePath) {
    this.http = createAxiosRequest();
    this.basePath = basePath;
  }

  find = async params => {
    const { size = 10, page = 1 } = params;

    const queries = {
      "page[size]": size,
      "page[number]": page,
    };

    const queryString = new URLSearchParams(queries).toString();

    return this.http
      .get(`${this.basePath}?${queryString}`)
      .then(res => res.data);
  };

  findOne = async ({ id }) => {
    return this.http.get(`${this.basePath}/${id}`).then(res => res.data);
  };

  delete = async ({ id }) => {
    return this.http.delete(`${this.basePath}/${id}`).then(res => res.data);
  };

  patch = async ({ id, values }) => {
    return this.http
      .patch(`${this.basePath}/${id}`, values)
      .then(res => res.data);
  };

  post = async ({ values }) => {
    return this.http.post(`${this.basePath}`, values).then(res => res.data);
  };

  getAll = async () => {
    return this.http.get(`${this.basePath}`).then(res => res.data);
  };

  get = async url => {
    return this.http.get(url).then(res => res.data);
  };
}
