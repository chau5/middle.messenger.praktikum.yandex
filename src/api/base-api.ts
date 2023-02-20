export default abstract class BaseAPI {
    static baseUrl = process.env.API_BASE_URL;

    create(title?: string): Promise<unknown> {
        /** @todo remove param and console.log and fix TS/ESlint issues */
        console.log(title);
        throw new Error('Not implemented');
    }

    request(): Promise<unknown> {
        throw new Error('Not implemented');
    }

    update(data: Record<string, any>): Promise<unknown> {
        /** @todo remove param and console.log and fix TS/ESlint issues */
        console.log(data);
        throw new Error('Not implemented');
    }

    delete(chatId?: number): Promise<unknown> {
        /** @todo remove param and console.log and fix TS/ESlint issues */
        console.log(chatId);
        throw new Error('Not implemented');
    }
}
