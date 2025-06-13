document.addEventListener("DOMContentLoaded", () => {
    const formDataDiv = document.getElementById("form-data");
    const params = new URLSearchParams(window.location.search);

    const fullName = params.get("full-name");
    const email = params.get("email-address");
    const company = params.get("company");
    const comments = params.get("comments");

    formDataDiv.innerHTML = `
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${company}</p>
        <p><strong>Comments:</strong> ${comments}</p>
    `;
});
