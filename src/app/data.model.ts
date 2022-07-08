import { FormControl } from "@angular/forms";

export interface User{
    id?:string,
    name: string,
    email: string,
    gender: string,
    dob: string,
    dp: string,
    hobbies: [],
    phoneNum: string,
    qualification: [],
    profession: string,
    description: string,
    contacts: any,
  }