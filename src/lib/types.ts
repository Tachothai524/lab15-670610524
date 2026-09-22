interface Student {
  studentId: string;
  firstName: string;
  lastName: string;
  program: "CPE" | "ISNE";
  courses?: string[];
}
export type { Student };

interface Course {
  courseId: string;
  courseTitle: string;
  instructors: string[];
  isEnrolled: boolean;
}
export type { Course };

interface Enrollment {
  studentId: string;
  courseId: string;
  enrolledAt?: string; // เวลาที่ลงทะเบียน แบบ ISO 8601 เช่น "2026-09-13T14:15:00"
}
export type { Enrollment };
