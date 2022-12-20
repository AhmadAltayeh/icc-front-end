export interface BaseResponse<T> {
    code: number;
    message: string;
    success: boolean;
    data: T;
}
