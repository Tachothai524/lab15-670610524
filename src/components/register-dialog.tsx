import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from 'lucide-react';
import type { Course } from "@/lib/types"

const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`
  }

// กำหนด Type ของข้อมูลที่จะส่งกลับ
export type EnrollmentPayload = {
  courseId: string;
};

type RegisterDialogProps = {
  availableCourses: Course[]; // รับรายชื่อวิชาที่ยังไม่ได้ลงทะเบียนมาจากหน้าหลัก
  onEnroll: (data: EnrollmentPayload) => void; // ฟังก์ชัน Callback ส่งข้อมูลกลับ
};

export function RegisterDialog({availableCourses , onEnroll}:RegisterDialogProps) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [currentTime, setCurrentTime] = useState(getCurrentTime);
  const [agree, setAgree] = useState(false);

  const selectedCourse = availableCourses.find((c) => c.courseId === courseId);

  useEffect(() => {
    if(open){
      setCurrentTime(getCurrentTime());
    }
  } , [open])

  // ฟังก์ชันสำหรับล้างค่าทั้งหมดให้กลับเป็นค่าเริ่มต้น
  const resetForm = () => {
    setCourseId("");
    setAgree(false);
  };


  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    setCourseId(""); // เคลียร์ฟอร์ม
    onEnroll({
      courseId,
    });

    setOpen(false); // ปิด Dialog
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button onClick={resetForm}> <UserPlus /> ลงทะเบียน</Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="cousesSelect">วิชา</Label>
            <Select 
            value={courseId} 
            onValueChange={(e) => {
              setCourseId(String(e));
              setAgree(Boolean(e));
              }}
            >
              <SelectTrigger className="w-full max-w-88">
                <SelectValue placeholder="เลือกวิชา">
                 {selectedCourse? `${selectedCourse.courseId} - ${selectedCourse.courseTitle}` : "เลือกวิชา"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {availableCourses.map((course) => (
                  <SelectItem key={course.courseId} value={course.courseId} >
                    {course.courseId} - {course.courseTitle}
                  </SelectItem>
                ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">เวลา</Label>
            <Input id="time" type="time" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} className="w-full"/>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input id="fullName" value="เตโชทัย ทั้งเจริญกุล" readOnly />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseId">โปรเเกรม</Label>
            <Input id="courseId" value="CPE" readOnly />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!agree}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
