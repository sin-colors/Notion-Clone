import { LoaderCircle } from "lucide-react";

function LoaderPage() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <LoaderCircle className="w-36 h-36 animate-spin text-blue-200" />
    </div>
  );
}

export default LoaderPage;
