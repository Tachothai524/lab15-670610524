import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent} from "@/lib/mock-data";
import type { EnrollmentPayload } from "@/components/register-dialog";


export default function Enrollent() {
  const [availableCourses, setAvailableCourses] = useState(courses);
  const handleUnenroll = (courseId: string) => {
    setAvailableCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.courseId === courseId ? { ...c, isEnrolled: false } : c
      )
    );
  };

  const handleEnroll = ({ courseId }:EnrollmentPayload) => {
    setAvailableCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.courseId === courseId ? { ...c, isEnrolled: true } : c
      )
    );
  };

  const notEnrolledList = availableCourses.filter((c) => !c.isEnrolled);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            เตโชทัย ทั้งเจริญกุล (670610524)
          </p>
        </div>
        <RegisterDialog 
        availableCourses={notEnrolledList}
        onEnroll={handleEnroll}
        />
      </div>

      <div className="flex flex-col gap-4">
        {availableCourses.map((course) => (
          
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            enrolledAt={course.courseId}
            isEnroll={course.isEnrolled}
            onUnenroll={() => handleUnenroll(course.courseId)}
          />
        ))}
      </div>
    </div>
  );
}
