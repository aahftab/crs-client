import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="fixed h-24 top-0 flex items-center z-50 gap-2 left-0 right-0 dark:bg-inherit"><Navbar /></header>
      <main className="mt-28"><Outlet /></main>
      
    </ThemeProvider>
  );
}
export default App;
