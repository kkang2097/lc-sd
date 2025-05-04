import Image from "next/image";
import PageContainer from "./components/PageContainer";
import ChatWidget from "./components/ChatWidget"; 
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <TopBar />
      <PageContainer/>
      <ChatWidget />
    </div>
  );
}
