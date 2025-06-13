document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            const formData = new FormData(contactForm);
            const contactData = {};

            formData.forEach((value, key) => {
                contactData[key] = value;
            });

            localStorage.setItem("contactData", JSON.stringify(contactData));
        });
    }
});
