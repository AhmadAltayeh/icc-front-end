export namespace StudentModel {
  export interface Student {
    firstName: string;
    lastName: string;
    email:string
    phoneNumber: string;
    facebookUrl: string;
    dateOfBirth:string;
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
