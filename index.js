document.addEventListener("DOMContentLoaded", () => {
  // ---------------- Theme Toggle ----------------
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

  // ---------------- Project Slideshow Data ----------------
  const projectDetails = {
   
    1: {
      images: ["Images/robot.png","Images/robot1.png","Images/robot2.png","Images/robot3.png"],
      description: "<ul></ul>",
      links: [
        { url: "https://github.com/wimaan3/robotics", label: "Robotics GitHub Repo" }
      ]
    },
    2: {
      images: ["Images/remote.jpg"],
      description: "<ul></ul>",
      links: [
        { url: "https://github.com/wimaan3/Embedded-Systems", label: "Embedded-Systems GitHub Repo" }
      ]
    },
    3: {
      images: ["Images/fpga.png","Images/fpga1.png","Images/fpga2.png"],
      description: "<ul></ul>",
      links: [
        { url: "https://github.com/wimaan3/Embedded-Systems", label: "Embedded-Systems GitHub Repo" }
      ]
    },
    4: {
      images: ["Images/drone1.png","Images/drone2.png","Images/drone3.png","Images/drone4.png","Images/drone5.png"],
      description: "<ul></ul>",
      links: [
        { url: "https://github.com/wimaan3/Robotics", label: "Robotics GitHub Repo" }
      ]
    },
    5: {
      images: ["Images/workinprogress.jpg"],
      description: "<ul></ul>",
      links: [
        { url: "https://github.com/wimaan3/Simulations", label: "Simulations GitHub Repo" }
      ]
    },
    6: {
      images: ["Images/ag1.png","Images/ag2.png","Images/ag3.png", "Images/ag4.png","Images/ag5.png","Images/cnn1.png",
        "Images/cnn2.png","Images/cnn3.png","Images/cnn4.png", "Images/cnn5.png", "Images/cnn6.png"

      ],
      description: "<ul></ul>",
      links: [
        { url: "https://github.com/wimaan3/AI-ML", label: "AI-ML GitHub Repo" }
      ]
    },
    7: {
      images: ["Images/ccro1.png","Images/ccro2.png","Images/ccro3.png"],
      description: "<ul></ul>",
      links: [
        { url: "https://github.com/wimaan3/Startups", label: "Startups GitHub Repo" }
      ]
    }
  };

  let currentProjectId = null;
  let currentImageIndex = 0;

  const modal = document.getElementById("projectModal");
  const slideshowImg = document.getElementById("slideshow-img");
  const projectDesc = document.getElementById("project-description");

  // ---------------- Modal Functions ----------------
  function openModal(projectId) {
    currentProjectId = projectId;
    currentImageIndex = 0;

    const project = projectDetails[projectId];
    if (!project) return;

    // Set first image + description
    slideshowImg.src = project.images[currentImageIndex];
    projectDesc.innerHTML = project.description;

    // Render links at top
    const linksContainer = document.getElementById("project-links");
    linksContainer.innerHTML = ""; // clear old
    if (project.links) {
      project.links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.target = "_blank";
        a.className = "modal-button";
        a.textContent = link.label;
        linksContainer.appendChild(a);
      });
    }

    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
    currentProjectId = null;
  }

  // ---------------- Slideshow Navigation ----------------
  function updateSlideshow(change = 0) {
    const project = projectDetails[currentProjectId];
    if (!project) return;

    currentImageIndex = (currentImageIndex + change + project.images.length) % project.images.length;
    slideshowImg.src = project.images[currentImageIndex];
  }

  // Expose to global
  window.nextSlide = () => updateSlideshow(1);
  window.prevSlide = () => updateSlideshow(-1);
  window.openModal = openModal;
  window.closeModal = closeModal;

  // ---------------- Close modal on outside click ----------------
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ---------------- Keyboard navigation ----------------
  window.addEventListener("keydown", (e) => {
    if (!currentProjectId) return;
    if (e.key === "ArrowRight") updateSlideshow(1);
    if (e.key === "ArrowLeft") updateSlideshow(-1);
    if (e.key === "Escape") closeModal();
  });
});
