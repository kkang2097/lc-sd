import Image from "next/image";
import PageContainer from "./components/PageContainer";
import ChatWidget from "./components/ChatWidget"; 
import TopBar from "./components/TopBar";
import { GlobalProvider } from "./providers/GlobalProvider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <GlobalProvider>
        <TopBar />
        <PageContainer/>
      </GlobalProvider>
    </div>
  );
}
