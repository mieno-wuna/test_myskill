import Joi from "joi";

export interface CreateCourseInterface {
    title: string;
    slug: string;
    desc: string;
    imageUrl: string;
    tag: string;
    content: string;
}

export const CreateCourseValidator = Joi.object<CreateCourseInterface>({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  content: Joi.string().required(),
  desc: Joi.string().required(),
  imageUrl: Joi.string().required(),
  tag: Joi.string().required(),
});
