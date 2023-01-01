export namespace InstructorModel {

  export interface Instructor {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    facebookUrl: string,
    password: string,
    imageUrl: string,
    isVolunteer: boolean,
    salary: number,
    cvUrl: string
  }

  export interface ResetPassword {
    id: number;
    newPassword: string;
    confirmPassword: string;
  }
  export interface InstructorCourse{
    courseId:number;
    instructorId:number;
  }
}
