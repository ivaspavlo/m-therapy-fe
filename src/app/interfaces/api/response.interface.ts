import { RESPONSE_STATUS } from '@app/core/constants';

export interface IResponse<T> {
  success: boolean,
  data: T,
  message?: string[],
  status: RESPONSE_STATUS
}
