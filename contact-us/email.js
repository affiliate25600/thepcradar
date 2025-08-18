const formEl = document.getElementById("contact-form");
const emailLoadingEl = document.getElementById("email-loading");
const emailProgressEl = document.getElementById("email-progress");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    emailLoadingEl.classList.add("active");

    emailProgressEl.innerText = "Sending...";

    const nameVal = document.getElementById("form-name").value;
    const emailVal = document.getElementById("form-email").value;
    const messageVal = document.getElementById("form-message").value;

    const params = {
        sender: nameVal,
        email: emailVal,
        message: messageVal
    };

    emailjs.send("service_w00x6ci", "template_qt9ud8o", params).then(() => {
        emailLoadingEl.classList.remove("active");

        emailProgressEl.innerText = "Sent";
    });
});