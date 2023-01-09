export namespace StudentModel {
  export interface Student {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    facebookUrl: string;
    dateOfBirth: string;
  }
  export interface ResetPassword {
    id: number;
    newPassword: string;
    confirmPassword: string;
  }
  export interface enrollCourse {
    courseId: number;
    instructorId: number;
  }
  export interface changePassword {
    id: number;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  export interface reg {
    firstName: string;
    lastName: string;
    email: string;
    facebookUrl: string;
    dateOfBirth: string;
    phoneNumber: string;
    newPassword: string;
    confirmPassword: string;
  }
}
