import { HttpStatusCode } from './httpStatus.constant';

type ResponseCodeType = typeof HttpStatusCode;
type StatusCodeType = ResponseCodeType[keyof ResponseCodeType];

export abstract class AbstractBaseResponse {
    statusCode!: StatusCodeType;
    message?: string;
}
