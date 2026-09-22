import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  return (
  <>
  <div className="mx-auto max-w-xl space-y-4">
    <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-x-xl bg-wight border border-gray-200 rounded-xl shadow-sm p-5 space y-6">
          <p className="front-bold text-gray-800">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </p>
          <Button
          type="button"
          onClick={() => navigate("/enrollment")}
          className="mt-4">
            ไปหน้าลงทะเบียนเรียน
          </Button>
        </div>
    </div>
  </div>
  </>
  )
}
