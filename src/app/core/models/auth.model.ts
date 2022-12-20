export namespace AuthModel {

  export class Login {
    constructor(
      public username: string,
      public password: string,
    ) {
    }
  }

  export interface ILoginResponse {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    role: string;
    isEnabled: boolean;
    token: string;
  }

  export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
}
