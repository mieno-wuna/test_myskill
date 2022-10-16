import { Request } from "express";
import { getFirestore } from "firebase-admin/firestore";

import { CreateCourseValidator } from "./validators/create-course-validator";
import { UpdateCourseValidator } from "./validators/update-course-validator";
import { StandardError } from "../../utils/standard-error";
import { StandardResponse } from "../../utils/standard-response";

export async function userCourseCreate(
  req: Request
): Promise<StandardResponse> {
  const { userId } = req.params;
  const { uid } = req.headers["user"] as any as { uid: string };

  if (uid !== userId) {
    throw new StandardError("Forbidden!", 403);
  }

  const validated = CreateCourseValidator.validate(req.body);

  if (validated.error) {
    throw validated.error.details;
  }

  const coursesRef = getFirestore().collection("courses");

  const {
    docs: { length: isSlugExist },
  } = await coursesRef.where("slug", "==", validated.value.slug).get();

  if (isSlugExist) {
    throw new StandardError("slug already exist");
  }

  const createCourseRef = await coursesRef.add({
    userId: uid,
    ...validated.value,
  });

  const course = (await createCourseRef.get()).data();

  return {
    data: {
      ...course,
      id: createCourseRef.id,
    },
    statusCode: 201,
  };
}

export async function userCourseShow(req: Request): Promise<StandardResponse> {
  const { userId, courseId } = req.params;
  const { uid } = req.headers["user"] as any as { uid: string };

  if (uid !== userId) {
    throw new StandardError("Forbidden!", 403);
  }

  const coursesRef = await getFirestore()
    .collection("courses")
    .doc(courseId)
    .get();
  const course = coursesRef.data();

  if (course!.userId !== userId) {
    throw new StandardError("Forbidden!", 403);
  }

  return {
    data: {
      ...course,
      id: coursesRef.id,
    },
    statusCode: 200,
  };
}

export async function userCourseShows(req: Request): Promise<StandardResponse> {
  const { userId } = req.params;
  const { uid } = req.headers["user"] as any as { uid: string };

  if (uid !== userId) {
    throw new StandardError("Forbidden!", 403);
  }

  const coursesRef = await getFirestore()
    .collection("courses")
    .where("userId", "==", userId)
    .get();
  const courses = coursesRef.docs.map((course) => ({
    ...course.data(),
    id: course.id,
  }));

  return {
    data: courses,
    statusCode: 200,
  };
}

export async function userCourseUpdate(
  req: Request
): Promise<StandardResponse> {
  const { userId, courseId } = req.params;
  const { uid } = req.headers["user"] as any as { uid: string };

  if (uid !== userId) {
    throw new StandardError("Forbidden!", 403);
  }

  const validated = UpdateCourseValidator.validate(req.body);
  if (validated.error) {
    throw validated.error.details;
  }

  const coursesRef = getFirestore().collection("courses").doc(courseId);
  const course = await coursesRef.get();
  const courseData = course.data();
  if (!course.exists) {
    throw new StandardError("course not found", 404);
  }

  if (courseData!.userId !== userId) {
    throw new StandardError("Forbidden!", 403);
  }

  const corseUpdate = await coursesRef.set({
    ...courseData,
    ...validated.value,
  });

  return {
    data: {
      ...courseData,
      ...validated.value,
      id: course.id,
    },
    statusCode: 200,
  };
}

export async function userCourseDelete(
  req: Request
): Promise<StandardResponse> {
  const { userId, courseId } = req.params;
  const { uid } = req.headers["user"] as any as { uid: string };

  if (uid !== userId) {
    throw new StandardError("Forbidden!", 403);
  }

  const coursesRef = getFirestore().collection("courses").doc(courseId);
  const course = await coursesRef.get();

  if (!course.exists) {
    throw new StandardError("Course not found", 404);
  }

  if (course.data()!.userId !== userId) {
    throw new StandardError("Forbidden", 403);
  }

  await coursesRef.delete();

  return {
    data: {
      ...course.data(),
      id: coursesRef.id,
    },
    statusCode: 200,
  };
}
