import { Comment } from "./comment.model";

export interface Animal {
  id: number;
  name: string;
  description: string;
  image: string;
  comments: Comment[];
}
