import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { lazy } from "react";

const Editor = lazy(() => import("./components/Editor"));

function App() {
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="strophe-theme">
      <div className="font-mono">
        <Navbar />
        <Editor />
        <Toaster richColors={true} position="bottom-left" />
      </div>
    </ThemeProvider>
  );
}

export default App;
