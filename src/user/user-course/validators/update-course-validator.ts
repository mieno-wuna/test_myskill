import Joi from "joi";

export interface UpdateCourseInterface {
    title?: string;
    slug?: string;
    desc?: string;
    imageUrl?: string;
    tag?: string;
    content?: string;
}

export const UpdateCourseValidator = Joi.object<UpdateCourseInterface>({
  title: Joi.string(),
  slug: Joi.string(),
  content: Joi.string(),
  desc: Joi.string(),
  imageUrl: Joi.string(),
  tag: Joi.string(),
});
