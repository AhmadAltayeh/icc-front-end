export namespace AdminModel {
  export interface Admin {
    firstName: string;
    lastName: string;
    email:string
    phoneNumber: string;
    facebookUrl: string;
    address: string;
    iban: string;
    imageUrl: string;
    roleId: number;
  }

  export interface ResetPassword {
    id: number;
    newPassword: string;
    confirmPassword: string;
  }
  export interface changePassword {
    id: number;
    oldPassword:string;
    newPassword: string;
    confirmPassword: string;
  }
}
