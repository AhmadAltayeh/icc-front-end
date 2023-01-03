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

  export interface InstructorProfile{
    firstName :string;
    lastName :string;
    phoneNumber: string;
    facebookUrl: string;
    imageUrl: string;
    cvUrl: string;
  }

  export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  export interface CreateMaterial{
    courseId: number;
    url: string;
    year: string
  }

  export interface UpdateMaterial{
    url: string;
    year: string
  }
}
