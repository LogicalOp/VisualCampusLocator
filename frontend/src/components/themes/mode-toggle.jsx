import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle({ onThemeChange }) {
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

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    onThemeChange(newTheme);
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant={theme === "light" ? "outline" : "default"}
        onClick={() => handleThemeChange("light")}
      >
        <Sun className="h-5 w-5" />
      </Button>
      <Button
        variant={theme === "dark" ? "outline" : "default"}
        onClick={() => handleThemeChange("dark")}
      >
        <Moon className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default ModeToggle;