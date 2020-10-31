import { ProfileModel } from "./ProfileModel";
import { TagModel } from "./TagModel";
export interface ArticleModel {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: TagModel[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileModel;
}
