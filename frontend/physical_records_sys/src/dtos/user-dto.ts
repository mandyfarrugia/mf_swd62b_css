import { Role } from "../types/role-types";

export interface UserDto {
  id : number;
  email : string;
  password : string;
  role : Role;
  name : string;
}
