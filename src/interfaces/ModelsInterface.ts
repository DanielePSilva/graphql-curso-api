import { CommentInstance, CommentModel } from "../models/CommentModel";
import  { PostModel } from "../models/PostModel";
import { UserModel } from "../models/UserModels";

export interface ModelsInterface {
    
    Comment: CommentModel;
    Post: PostModel;
    User: UserModel;
  


}