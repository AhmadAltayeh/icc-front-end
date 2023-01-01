export namespace CourseModel {
  export interface Course {
    name:string;
    description	:string;
    duration	:number;
    startDate	:string;
    endDate	:string;
    lectureTime	:string;
    daysOfWeek	:string;
    category	:string;
    maxParticipants	:number;
    isPreRecorded	:boolean;
    isOnline	:boolean;
    isFree	:boolean;
    price	:number;
    classroom	:string;
    semester	:string;
    year	:string;
    teamsLink	:string;
    lastRegDay:string;
  }
  export interface StudentCourse {
    studentId:number;
    courseId:number;
  }
}
