export namespace AdminModel {
  export interface Admin {
    firstName: string;
    lastName: string;
    email:string
    phoneNumber: string;
    facebookUrl: string;
    address: string;
    iban: string;
    roleId: number;
  }

  export interface ResetPassword {
    id: number;
    newPassword: string;
    confirmPassword: string;
  }
}
