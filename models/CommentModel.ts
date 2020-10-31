import { ProfileModel } from "./ProfileModel";

export interface CommentModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: ProfileModel;
}
