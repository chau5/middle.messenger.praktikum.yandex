enum METHOD {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type RequestOptionsProps = {
    data?: Record<string, any>;
    headers?: Record<string, string>;
    timeout?: number;
};

type RequestMethodOptionsProps = RequestOptionsProps & {
    method: string;
};

type HTTPMethodProps = (url: string, options?: RequestOptionsProps) => Promise<unknown>;

function queryStringify(data: Record<string, any>) {
    if (!data) {
        return false;
    }
    const keys = Object.keys(data);
    return Object.keys(data).reduce(
        (acc, key, index) => `${acc}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
        '?'
    );
}

export default class HTTP {
    get: HTTPMethodProps = (url, options) =>
        this.request(
            options?.data ? `${url}${queryStringify(options.data)}` : url,
            { ...options, data: {}, method: METHOD.GET },
            options?.timeout
        );

    post: HTTPMethodProps = (url, options) =>
        this.request(url, { ...options, method: METHOD.POST }, options?.timeout);

    put: HTTPMethodProps = (url, options) =>
        this.request(url, { ...options, method: METHOD.PUT }, options?.timeout);

    delete: HTTPMethodProps = (url, options) =>
        this.request(url, { ...options, method: METHOD.DELETE }, options?.timeout);

    request = (url: string, options: RequestMethodOptionsProps, timeout = 5000) => {
        const { method, data, headers } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('Oops, there is no method provided'));
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            if (headers && Object.keys(headers).length) {
                Object.keys(headers).forEach(header => {
                    xhr.setRequestHeader(header, headers[header]);
                });
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.withCredentials = true;

            if (method === METHOD.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
