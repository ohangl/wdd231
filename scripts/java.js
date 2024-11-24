
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

function renderCourses(filter = "All") {
    const courseContainer = document.querySelector("#courseContainer");
    courseContainer.innerHTML = "";


    const filteredCourses = courses.filter(course =>
        filter === "All" || course.subject === filter
    );


    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.className = `course-card ${course.completed ? "completed" : "incomplete"}`;
        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(", ")}</p>
        `;
        courseContainer.appendChild(courseCard);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.querySelector("#totalCredits").textContent = `Total Credits: ${totalCredits}`;
}


document.querySelector("#filterAll").addEventListener("click", () => renderCourses("All"));
document.querySelector("#filterCSE").addEventListener("click", () => renderCourses("CSE"));
document.querySelector("#filterWDD").addEventListener("click", () => renderCourses("WDD"));

// añoactual
document.querySelector("#currentYear").textContent = new Date().getFullYear();

// lastmodificacion
document.querySelector("#lastModified").textContent = `Last Updated: ${document.lastModified}`;

// function burger
document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector("nav ul").classList.toggle("show");
});

renderCourses();

