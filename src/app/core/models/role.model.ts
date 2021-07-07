import { Functionality } from "./functionality.model";

export interface Role {
  id: number;
  code: string;
  name: string;
  funtionalities?: Functionality[];
}
