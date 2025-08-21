const container = document.getElementById("article");

const adEl = `
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9445635512536138" crossorigin="anonymous"></script>
    <!-- Display horizontal responsive -->
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9445635512536138" data-ad-slot="1830852105" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
`;

document.title = `${article.title} | The PC Radar`;

container.innerHTML = `
    <header>
        <h1>${article.title}</h1>
        <h3>${article.author}, ${article.date}</h3>
        <p>${article.introduction}</p>
    </header>

    ${adEl}
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

        ${adEl}
    `;

    container.append(itemEl);
});

container.innerHTML += `
    <p class="conclusion">${article.conclusion}</p>
    <div class="vote-container">
        <p>Like this article?</p>
        <div class="vote-button-container">
            <button class="vote-btn" id="upvote-btn" onclick="articleVote('${article.id}', 1)">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"></path></g></svg>
            </button>
            <span id="vote-button-count">0</span>
            <button class="vote-btn" id="downvote-btn" onclick="articleVote('${article.id}', -1)">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"></path></g></svg>
            </button>
        </div>
    </div>
`;