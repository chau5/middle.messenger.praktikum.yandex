export default abstract class BaseAPI {
    static baseUrl = process.env.API_BASE_URL;

    create(): Promise<unknown> {
        throw new Error('Not implemented');
    }

    request(): Promise<unknown> {
        throw new Error('Not implemented');
    }

    update(data: Record<string, any>): Promise<unknown> {
        console.log(data);
        throw new Error('Not implemented');
    }

    delete(): Promise<unknown> {
        throw new Error('Not implemented');
    }
}
