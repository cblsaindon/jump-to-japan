function toggleTheme()
{
  e = document.getElementById("body")

  if (e.className.includes("light-theme")) { //SET TO LIGHT MODE
    e.className = e.className.replace("light-theme", "dark-theme");
  } else { //SET TO DARK MODE
    e.className = e.className.replace("dark-theme", "light-theme");
  }
}