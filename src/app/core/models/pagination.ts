import {BaseResponse} from './base_response.model';
import {AppUtils} from "../utils";

export interface PaginationResult<T> extends BaseResponse<T[]> {
    allRecords: number;
}

export class PaginationQuery {
    constructor(
        public page = 0,
        public size = 25,
    ) {
    }

    asString() {
        return AppUtils.convertObjectToQueryParams(this);
    }

    addParams(key: string, value: string) {
        (this as any)[key] = value;
    }

}
