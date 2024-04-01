import Navbar from "./components/ui/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router-dom";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <header className="top-0 flex items-center jus gap-2 left-0 right-0 fixed bg-slate-100 dark:bg-inherit"><Navbar /></header>
      <main className="pt-20"><Outlet /></main>
    </ThemeProvider>
  );
}
export default App;
