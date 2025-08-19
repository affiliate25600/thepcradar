const formEl = document.getElementById("contact-form");
const emailLoadingEl = document.getElementById("email-loading");
const emailProgressEl = document.getElementById("email-progress");

formEl.addEventListener("submit", (event) => {
    event.preventDefault();

    emailLoadingEl.classList.add("active");

    emailProgressEl.innerText = "Sending...";

    let nameVal = document.getElementById("form-name");
    let emailVal = document.getElementById("form-email");
    let messageVal = document.getElementById("form-message");

    const params = {
        sender: nameVal.value,
        email: emailVal.value,
        message: messageVal.value
    };

    emailjs.send("service_w00x6ci", "template_qt9ud8o", params).then(() => {
        emailLoadingEl.classList.remove("active");

        emailProgressEl.innerText = "Sent";

        nameVal.value = "";
        emailVal.value = "";
        messageVal.value = "";
    });
});