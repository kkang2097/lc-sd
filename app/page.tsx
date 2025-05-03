import Image from "next/image";
import PageContainer from "./components/PageContainer";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-gray-800">Leetcode for System Design</h1>
      <PageContainer/>
    </div>
  );
}
