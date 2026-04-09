document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // Validation
    if (!name || !email || !message) {
        alert("All fields are required!");
        return;
    }

    if (!email.includes("@")) {
        alert("Invalid email!");
        return;
    }

 
    let submissions = JSON.parse(localStorage.getItem("contacts")) || [];

    submissions.push({ name, email, message });

    localStorage.setItem("contacts", JSON.stringify(submissions));

    alert("Form submitted successfully!");

    document.getElementById("contactForm").reset();
});