import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.initializeResponseInterceptor();
  }

  protected getResource = <Resource>(endpoint: string, config?: AxiosRequestConfig<any> | undefined) => {
    return this.instance.get<Resource>(endpoint, config);
  };

  protected createResource = <Resource>(endpoint: string, data: any, config?: AxiosRequestConfig<any> | undefined) => {
    return this.instance.post<Resource>(endpoint, data, config);
  };

  protected deleteResource = (endpoint: string, config?: AxiosRequestConfig<any> | undefined) => {
    return this.instance.delete(endpoint, config);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = ({ data }: AxiosResponse) => data;

  protected handleError = (error: any) => console.log(error);
}

export default HttpClient;
