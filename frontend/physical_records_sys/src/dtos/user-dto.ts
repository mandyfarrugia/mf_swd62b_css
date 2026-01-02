export type Role = 'clerk' | 'manager' | 'admin';

export interface UserDto {
  id : number;
  email : string;
  password : string;
  role : Role;
  name : string;
}
