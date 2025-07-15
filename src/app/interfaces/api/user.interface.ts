import { USER_DATA_FIELDS } from "@app/core/constants";

export interface IUserUpdate {
  [USER_DATA_FIELDS.FIRSTNAME]: string;
  [USER_DATA_FIELDS.LASTNAME]: string;
  [USER_DATA_FIELDS.EMAIL]: string;
  [USER_DATA_FIELDS.PHONE]: string;
  [USER_DATA_FIELDS.BIRTHDAY]: number;
}
