import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const isDark = currentTheme === "dark";

  const toggleTheme = () => (isDark ? setTheme("light") : setTheme("dark"));

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "light mode" : "dark mode"}
      className='p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full'
    >
      {isDark ? (
        <SunIcon className='w-5 h-5' />
      ) : (
        <MoonIcon className='w-4 h-4' />
      )}
    </button>
  );
}

export default ThemeToggle;
