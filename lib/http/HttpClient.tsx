import React from "react";

export interface HttpClient {
  get: <T>(url: string) => Promise<T>;
  post: <T>(url: string, body: any) => Promise<T>;
  delete: <T>(url: string, body: any) => Promise<T>;
  put: <T>(url: string, body: any) => Promise<T>;
  setAuthToken: (token: string) => void;
}

export function useHttpClient() {
  return React.useContext(context);
}

export const HttpClientProvider: React.FC<{ client?: HttpClient }> = (
  props
) => {
  const client = props.client ?? clientInstance;
  return <context.Provider value={client}>{props.children}</context.Provider>;
};

export interface ApiResponse {
  errors?: {
    [key: string]: string[];
  };
}
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "OPTIONS";

class HttpClientImpl implements HttpClient {
  api_base = "/api";
  _user_token = "";

  public setAuthToken(token: string) {
    this._user_token = token;
  }

  public async get<T extends ApiResponse>(url: string): Promise<T> {
    return this.executeRequest(url, { method: "GET" });
  }

  public async post<T extends ApiResponse>(url: string, body: any): Promise<T> {
    return this.executeRequest(url, { body, method: "POST" });
  }

  public async delete(url: string, body: any) {
    return this.executeRequest(url, { body, method: "DELETE" });
  }

  public async put(url: string, body: any) {
    return this.executeRequest(url, { body, method: "PUT" });
  }

  private async executeRequest(
    url: string,
    options: { body?: any; method: HttpMethod }
  ) {
    const uri =
      url.startsWith("https://") || url.startsWith("http://")
        ? url
        : `${this.api_base}${url.startsWith("/") ? url : "/" + url}`;
    try {
      const res = await fetch(uri, {
        body: options.body,
        method: options.method,
        headers: {
          Authorization: "Token " + this._user_token,
        },
      });
      const json = await res.json();
      return json;
    } catch (error) {
      return ({ errors: { error: ["must not be null"] } } as unknown) as any;
    }
  }
}

function createClient(): HttpClient {
  return new HttpClientImpl();
}

const clientInstance = createClient();
const context = React.createContext(clientInstance);
