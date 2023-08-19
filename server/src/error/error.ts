import { HttpStatusCode } from 'src/constant/httpStatus.constant';

export class InvalidULIDException extends Error {
    constructor() {
        super(`Invalid ULID ${HttpStatusCode.badRequest}`);
        this.name = 'InvalidULIDException';
    }
}
