document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-theme");
  const root = document.documentElement;

 
  function updateThemeButton() {
    toggleButton.textContent = root.classList.contains("dark-theme") ? "Light Mode" : "Dark Mode";
  }

  // Initialize saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark-theme" || savedTheme === "light-theme") {
    root.classList.add(savedTheme);
  } else {
    root.classList.add("dark-theme");
  }
  updateThemeButton();

  toggleButton.addEventListener("click", () => {
    root.classList.toggle("dark-theme");
    root.classList.toggle("light-theme");
    localStorage.setItem("theme", root.classList.contains("dark-theme") ? "dark-theme" : "light-theme");
    updateThemeButton();
  });
});
