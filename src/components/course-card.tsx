import type { Course, Student } from "@/lib/types";
import { Trash } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  isEnroll: boolean;
  onUnenroll: () => void;
};

export function CourseCard({ course, student, enrolledAt, isEnroll, onUnenroll }: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
        </div>
        <div className="shrink-0">
          {isEnroll? 
      (
      <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-amber-600 bg-amber-50 border-amber-200 dark:text-purple-400 dark:bg-amber-950/60 dark:border-purple-800/6">
        ลงทะเบียนแล้ว
      </span>
      )
      : (
          <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-purple-600 bg-purple-50 border-purple-200 dark:text-amber-500 dark:bg-amber-950/60 dark:border-amber-800/6">
            เปิดรับ
          </span>
        ) 
      }
        </div>
      </CardHeader>
      {isEnroll &&
      (
      <CardContent className="flex items-end justify-between">
        <div className="text-xs text-muted-foreground">
          <p>
            ชื่อ นศ.: {student.firstName} {student.lastName}
          </p>
          <p>โปรแกรม: {student.program}</p>
          <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
        </div>

        <button
            type="button"
            onClick={onUnenroll}
            className=" text-red-500 hover:text-red-700 p-1 transition-colors "
            title="delete"
          >
            <Trash className="h-4 w-4" />
          </button>
      </CardContent>)}
    </Card>
  );
}
