export default class OnvoBase {
    #private;
    endpoint: string;
    fetchBase(url: string, method?: "GET" | "PUT" | "POST" | "DELETE" | "PATCH", body?: any): Promise<unknown>;
    streamingFetch(url: string, method: "GET" | "PUT" | "POST" | "PATCH", body: any, callbacks: {
        onStream: (str: string) => void;
        onComplete: (str: string) => void;
        onError: (err: Error) => void;
    }): Promise<void>;
    constructor(apiKey: string, options?: {
        endpoint: string;
    });
}
