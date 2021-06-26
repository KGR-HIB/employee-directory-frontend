import { Functionality } from "./functionality.model";

export interface Role {
  roleId: number;
  code: string;
  name: string;
  funtionalities: Functionality[];
}