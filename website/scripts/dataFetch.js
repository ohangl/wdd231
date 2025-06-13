document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects-container");
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeButton = document.querySelector(".close-button");

    async function fetchData() {
        try {
            const response = await fetch("data/data.json");

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();

            data.forEach((item, index) => {
                let itemHTML = "";

                if (item.type === "Project") {
                    itemHTML = `
                        <div class="project-item" data-index="${index}">
                            <img src="${item.image}" alt="${item.title}" loading="lazy">
                            <div class="project-info">
                                <h2>${item.title}</h2>
                                <p>${item.year}</p>
                                <p class="category">${item.category}</p>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    `;
                } else if (item.type === "Service") {
                    itemHTML = `
                        <div class="service-item">
                            <h2>Service: ${item.name}</h2>
                            <p>Duration: ${item.duration}</p>
                            <p>Price: ${item.price}</p>
                            <p>Includes: ${item.includes}</p>
                        </div>
                    `;
                } else if (item.type === "Skill") {
                    itemHTML = `
                        <div class="skill-item">
                            <h2>Skill: ${item.name}</h2>
                            <p>Level: ${item.level}</p>
                            <p>Experience: ${item.experience}</p>
                            <p>Rating: ${item.rating}</p>
                        </div>
                    `;
                }

                projectsContainer.innerHTML += itemHTML;
            });

            const projectItems = document.querySelectorAll(".project-item");
            projectItems.forEach(item => {
                item.addEventListener("click", () => {
                    const index = item.dataset.index;
                    const selectedItem = data[index];
                    openModal(selectedItem);
                });
            });

        } catch (error) {
            console.error("Error loading data:", error);
            projectsContainer.innerHTML = `<p>Oops! Failed to load data.</p>`;
        }
    }

    function openModal(item) {
        modalBody.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}" style="max-width:300px;">
            <p>Year: ${item.year}</p>
            <p>Category: ${item.category}</p>
            <p>Description: ${item.description}</p>
        `;
        modal.style.display = "block";
    }

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    fetchData();
});
