export const ACTION_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  VALIDATION_ERROR: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export type ActionStatus = (typeof ACTION_STATUS)[keyof typeof ACTION_STATUS];

export type AuthErrorCode =
  | "BAD_REQUEST"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "TOO_MANY_REQUESTS"
  | "INVALID_CREDENTIALS"
  | "INVALID_TOKEN"
  | "TOKEN_EXPIRED"
  | "EMAIL_NOT_VERIFIED"
  | "EMAIL_ALREADY_VERIFIED"
  | "EMAIL_ALREADY_EXISTS"
  | "INVALID_EMAIL"
  | "INVALID_PASSWORD"
  | "PASSWORD_MISMATCH"
  | "PASSWORD_TOO_WEAK"
  | "PASSWORD_RESET_FAILED"
  | "PASSWORD_RESET_TOKEN_INVALID"
  | "PASSWORD_RESET_TOKEN_EXPIRED"
  | "VERIFICATION_FAILED"
  | "VERIFICATION_TOKEN_INVALID"
  | "VERIFICATION_TOKEN_EXPIRED"
  | "SESSION_EXPIRED"
  | "SESSION_INVALID"
  | "SESSION_REQUIRED"
  | "ACCOUNT_NOT_FOUND"
  | "ACCOUNT_DISABLED"
  | "ACCOUNT_LOCKED"
  | "OAUTH_ERROR"
  | "OAUTH_ACCOUNT_NOT_FOUND"
  | "OAUTH_ACCOUNT_ALREADY_LINKED"
  | "PROVIDER_NOT_SUPPORTED"
  | "RATE_LIMITED"
  | "INTERNAL_SERVER_ERROR"
  | "UNKNOWN_ERROR";

export type ActionSuccess<T> = {
  success: true;
  status: 200 | 201;
  data: T;
  message?: string;
};

export type ActionFailure = {
  success: false;
  status: Exclude<ActionStatus, 200 | 201>;
  code: AuthErrorCode;
  error: string;
  fieldErrors?: Record<string, string[]>;
  message?: string;
};

export type ActionResult<T> = ActionSuccess<T> | ActionFailure;

export function actionResponse<T>(
  status: 200 | 201,
  data: T,
  message?: string,
): ActionSuccess<T>;

export function actionResponse(
  status: Exclude<ActionStatus, 200 | 201>,
  error: string,
  code: AuthErrorCode,
  fieldErrors?: Record<string, string[]>,
  message?: string,
): ActionFailure;

export function actionResponse<T>(
  status: ActionStatus,
  dataOrError: T | string,
  codeOrMessage?: AuthErrorCode | string,
  fieldErrors?: Record<string, string[]>,
  message?: string,
): ActionResult<T> {
  if (status === ACTION_STATUS.OK || status === ACTION_STATUS.CREATED) {
    return {
      success: true,
      status,
      data: dataOrError as T,
      ...(codeOrMessage ? { message: codeOrMessage } : {}),
    };
  }

  return {
    success: false,
    status,
    code: codeOrMessage as AuthErrorCode,
    error: dataOrError as string,
    ...(fieldErrors ? { fieldErrors } : {}),
    ...(message ? { message } : {}),
  };
}
