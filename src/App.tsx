import Editor from "./components/Editor";
import { Navbar } from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="strophe-theme">
      <div className="font-mono">
        <Navbar />
        <Editor />
      </div>
    </ThemeProvider>
  );
}

export default App;
