const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");

navbar.innerHTML = `
    <input type="checkbox" id="nav-toggle" class="nav-toggle">
    <a class="logo" href="/">
        <img src="/logo.png" alt="The PC Radar Logo">
    </a>
    <label class="nav-overlay" for="nav-toggle"></label>
    <div class="links">
        <label class="nav-x" for="nav-toggle">
            <svg fill="#062B40" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g></svg>
        </label>
            <a href="/">Home</a>
            <a href="/about-us">About</a>
            <a href="/contact-us">Contact</a>
    </div>
    <label class="nav-hamburger" for="nav-toggle">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 18L20 18" stroke="#062B40" stroke-width="2" stroke-linecap="round"></path> <path d="M4 12L20 12" stroke="#062B40" stroke-width="2" stroke-linecap="round"></path> <path d="M4 6L20 6" stroke="#062B40" stroke-width="2" stroke-linecap="round"></path> </g></svg>
    </label>
`;

const d = new Date()

footer.innerHTML = `
    <div class="footer-links">
        <a href="/about-us">About Us</a>
        <a href="/contact-us">Contact Us</a>
        <a href="/privacy-policy">Privacy Policy</a>
    </div>
    <img src="/logo.png" alt="The PC Radar Logo">
    <p>&copy; The PC Radar ${d.getFullYear()}</p>
`;