import { CORE_ROUTE_NAMES } from "@app/core/constants";

export const AUTH_ROUTE_NAMES = {
  SELF: CORE_ROUTE_NAMES.AUTH,
  BLANK: '',
  LOGIN: 'login',
  REGISTER: 'register',
  REGISTER_CONFIRM: 'register-confirm/:token',
  REMIND_PASSWORD: 'remind',
  RESET_PASSWORD: 'reset/:token',
  UNSUBSCRIBE: 'unsubscribe/:token'
};
