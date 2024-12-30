export interface GuardI {
  checkSessionIsValid(access_token: string): Promise<CheckValidResultT>;
  login($payload: $LoginPayload): Promise<LoginResult>;
  refreshToken(): Promise<LoginResult>;
  logout(): Promise<boolean>;
}
