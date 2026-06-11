export const getTheme = () => {
  return localStorage.getItem("theme") || "light";
};
export const setTheme = (theme: "light" | "dark") => {
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
export const initializeTheme = () => {
  const theme = getTheme();
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  }
};
