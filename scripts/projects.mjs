const projectsGrid = document.querySelector("#projectsGrid");
let projects = [];
async function getProjects() {
    try {
        const response = await fetch("./data/projects.json");
        if (!response.ok) {
            throw new Error("Unable to load projects.");
        }
        projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error(error);
        projectsGrid.innerHTML = `<p>Unable to load projects at this time</p>`;
    }
}
function displayProjects(projectList) {
    projectsGrid.innerHTML = "";
    projectList.forEach((project) => {
        const card = document.createElement("article");
        card.classList.add("project-preview");
        card.dataset.category = project.category;
        card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title} project screenshot" loading="lazy" width="300" height="300">
        </div>
        <div class="project-content">
            <p class="project-category">${project.category}</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technology.map((tech) => `<span>${tech}</span>`).join("")}
            </div>
            <div class="project-links">
                ${project.live ? `<a href="${project.live}" class="primary-button" target="_blank" rel="noopener">Live Demo</a>` : ""}
                <a href="${project.github}" class="secondary-button" target="_blank" rel="noopener">GitHub</a> 
            </div>
        </div>
        `;
        projectsGrid.appendChild(card);
    });
}
getProjects();

const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        const filter = button.dataset.filter;
        if (filter === "all") {
            displayProjects(projects);
        } else {
            const filteredProjects = projects.filter(
                (project) => project.category === filter
            );
            displayProjects(filteredProjects)
        }
    })
});