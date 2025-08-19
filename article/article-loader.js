const container = document.getElementById("article");

document.title = `${article.title} | The PC Radar`;

container.innerHTML = `
<header>
    <h1>${article.title}</h1>
    <h3>${article.author}</h3>
    <p>${article.description}</p>
</header>
`;

article.items.forEach((item, idx) => {
    const itemEl = document.createElement("section");

    let ratings = "";

    const rating = Math.round(item.rating / 0.5) * 0.5

    fullStars = Math.floor(rating);

    for (let i = 0; i < fullStars; i++) {
        ratings += `
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.00001 0H7.00001L5.51292 4.57681L0.700554 4.57682L0.0825195 6.47893L3.97581 9.30756L2.48873 13.8843L4.10677 15.0599L8.00002 12.2313L11.8933 15.0599L13.5113 13.8843L12.0242 9.30754L15.9175 6.47892L15.2994 4.57681L10.4871 4.57681L9.00001 0Z" fill="#FFEA00"></path> </g></svg>
        `;
    }

    if (Math.floor(rating) !== rating) ratings += `
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0.700554 4.57682L0.0825195 6.47893L3.97581 9.30756L2.48873 13.8843L4.10677 15.0599L8.00002 12.2313L8.00001 0H7.00001L5.51292 4.57681L0.700554 4.57682Z" fill="#FFEA00"></path> </g></svg>
    `;

    let specs = "";

    item.specs.forEach((spec) => {
        specs += `<span><b>${spec.name}: </b>${spec.value}</span>`;
    });

    itemEl.innerHTML = `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9445635512536138" crossorigin="anonymous"></script>
        <!-- Display horizontal responsive -->
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9445635512536138" data-ad-slot="1830852105" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>

        <h2>${item.title}</h2>
        <div class="content">
            <div class="image">
                <img src="${item.image}"/>
                <a href="${item.image}" target="_blank">Source</a>
            </div>
            <div class="info">
                <div class="info-section">
                    <h4>Rating</h4>
                    <p><span>${ratings}</span>${item.rating}</p>
                </div>
                <div class="info-section">
                    <h4>Description</h4>
                    <p>${item.description}</p>
                </div>
                <div class="info-section">
                    <h4>Specs</h4>
                    <p>${specs}</p>
                </div>
            </div>
        </div>
        <button onclick="productLink('${item.link}', '${item.title}')">GET IT NOW</button>
    `;

    container.append(itemEl);
});