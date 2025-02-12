import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import ModeToggle from "./themes/mode-toggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 border-2 z-50",
        isScrolled
          ? theme === "dark"
            ? "bg-gray-950 text-white shadow-lg border-gray-600"
            : "bg-gray-50 text-black shadow-lg border-gray-300"
          : theme === "dark"
            ? "bg-gray-950 text-white border-gray-600"
            : "bg-gray-50 text-black border-gray-300"
      )}
    >
      <a href="/" className="text-xl font-bold">
        VPR ( DEMO )
      </a>

      <div className="flex items-center space-x-4">
        <ModeToggle onThemeChange={handleThemeChange} />
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu size={24} />
        </Button>
      </div>
    </nav>
  );
}