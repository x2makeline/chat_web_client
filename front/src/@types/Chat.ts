import { Dayjs } from "dayjs";
import { User } from "./User.ts";

export class Chat {
  id!: number;
  text!: string;
  createBy!: User;
  createAt!: Dayjs;
}
