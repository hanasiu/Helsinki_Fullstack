interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptive extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescriptive {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescriptive {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;