export namespace Exceptions {

    export class ResourceNotFound extends Error {
        constructor(message?: string) {
            super(message);
        }
    }

}