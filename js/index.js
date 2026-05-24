const hamburger = document.querySelector("#hamburger");
const navLinks = document.querySelector(".nav-links");
const projectsGrid = document.querySelector("#projects-grid");
const sections = document.querySelectorAll("section");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
});

const projects = [
  {
    title: "Portfolio Site",
    description:
      "Personal portfolio built with vanilla HTML, CSS and JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
  },
  {
    title: "Quiz App",
    description: "Interactive quiz with score tracking and dynamic questions.",
    tech: ["HTML", "CSS", "JavaScript"],
    link: "#",
  },
  {
    title: "Coming soon",
    description: "Next project in progress...",
    tech: [],
    link: "#",
  },
];

const renderProjects = () => {
  projectsGrid.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tech">${project.tech.join(" · ")}</div>
      <a href="${project.link}" class="btn">View project</a>
    </div>
  `,
    )
    .join("");
};

renderProjects();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // FIRST — clean slate, remove active from everyone
        document.querySelectorAll(".nav-links a").forEach((link) => {
          link.classList.remove("active");
        });

        // THEN — add active to the matching link
        const activeLink = document.querySelector(
          `a[href="#${entry.target.id}"]`,
        );
        activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible"); // ✅ add visible to THIS element
        revealObserver.unobserve(entry.target); // ✅ stop watching it
      }
    });
  },
  { threshold: 0.15 },
);

// observe every reveal element
document.querySelectorAll(".reveal").forEach((el) => {
  revealObserver.observe(el); // ✅ watch each one
});
