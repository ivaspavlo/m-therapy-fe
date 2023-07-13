export enum INPUT_TYPES {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  PASSWORD = 'password',
  EMAIL = 'email',
  PHONE = 'phone',
  STANDALONE = 'standalone'
}

export type InputType = Record<INPUT_TYPES, string>;
