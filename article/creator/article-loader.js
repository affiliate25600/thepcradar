const articleEditorEl = document.getElementById("article-editor");
const exportOptionsEl = document.getElementById("export-options");
const loadOptionsEl = document.getElementById("load-options");

const defaultProject = {
    projectName: "New Project",
    url: "this-is-my-page-url",
    description: "",
    title: "",
    author: "",
    date: getFormattedDate(),
    introduction: "",
    conclusion: "",
    items: [
        {
            name: "",
            image: "",
            rating: 5,
            description: "",
            link: "",
            specs: [
                {
                    name: "",
                    value: ""
                }
            ]
        }
    ]
};

let allArticles = JSON.parse(localStorage.getItem("article-projects")) || {};
let openArticle = parseInt(localStorage.getItem("open-project")) || createAritcleId();

let article = allArticles[openArticle] || JSON.parse(JSON.stringify(defaultProject));

loadFromArticle();

reloadArticle();

setInterval(() => {
    article = {
        projectName: valOfEl("project-name"),
        url: valOfEl("article-url"),
        description: valOfEl("article-description"),
        title: valOfEl("article-title"),
        author: valOfEl("article-author"),
        date: valOfEl("article-date"),
        introduction: valOfEl("article-introduction"),
        conclusion: valOfEl("article-conclusion"),
        items: getItems()
    };
    
    allArticles[openArticle] = article;
    localStorage.setItem("article-projects", JSON.stringify(allArticles));
    localStorage.setItem("open-project", openArticle);

    //localStorage.setItem(`article-template-${openArticle}`, JSON.stringify(article))

    reloadArticle();
}, 1000);

function createAritcleId() {
    return Math.floor(Math.random() * 999999999);
}

function getFormattedDate() {
  const date = new Date();

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const getOrdinalSuffix = (n) => {
    if (n >= 11 && n <= 13) return `${n}th`;
    switch (n % 10) {
      case 1: return `${n}st`;
      case 2: return `${n}nd`;
      case 3: return `${n}rd`;
      default: return `${n}th`;
    }
  };

  return `${month} ${getOrdinalSuffix(day)} ${year}`;
}


function addItem() {
    article.items.push({
        name: "",
        image: "",
        rating: 5,
        description: "",
        link: "",
        specs: [
            {
                name: "",
                value: ""
            }
        ]
    });

    loadFromArticle();
}

function addSpec(itemId) {
    article.items[itemId].specs.push({
        name: "",
        value: ""
    });

    loadFromArticle();
}

function deleteItem(id) {
    article.items = article.items.filter((item, idx) => idx !== id);

    loadFromArticle();
}

function deleteSpec(itemId, specId) {
    article.items[itemId].specs = article.items[itemId].specs.filter((spec, idx) => idx != specId);

    loadFromArticle();
}

function loadFromArticle() {
    articleEditorEl.innerHTML = `
        <div class="project-options">
            <button class="project-btn" onclick="openLoadOptions()">Load</button>
            <button class="project-btn" onclick="openExportOptions()">Export</button>
        </div>
        <div class="editor-group">
            <h2>Project Name</h2>
            <input type="text" id="project-name" placeholder="Name..." autocomplete="off" value="${article.projectName}">
        </div>
        <div class="editor-group">
            <h2>Page URL</h2>
            <input type="text" id="article-url" placeholder="URL..." autocomplete="off" oninput="urlElVal()" spellcheck="false" value="${article.url}">
        </div>
        <div class="editor-group">
            <h2>Page Description</h2>
            <span>This is the text below a link on a search engine</span>
            <textarea id="article-description" placeholder="Description...">${article.description}</textarea>
        </div>
        <div class="editor-group">
            <h2>Title</h2>
            <input type="text" id="article-title" placeholder="Title..." autocomplete="off" value="${article.title}">
        </div>
        <div class="editor-group">
            <h2>Author</h2>
            <input type="text" id="article-author" placeholder="Author..." autocomplete="off" value="${article.author}">
        </div>
        <div class="editor-group">
            <h2>Date</h2>
            <input type="text" id="article-date" placeholder="Date..." autocomplete="off" value="${article.date}">
        </div>
        <div class="editor-group">
            <h2>Introduction</h2>
            <textarea id="article-introduction" placeholder="Introduction...">${article.introduction}</textarea>
        </div>
        <div class="editor-group">
            <h2>Conclusion</h2>
            <textarea id="article-conclusion" placeholder="Conclusion...">${article.conclusion}</textarea>
        </div>
        <div class="editor-group items-container" id="items-container" data-items-num="${article.items.length}">
            <div class="items-title">
                <h2>Items</h2>
                <button onclick="addItem()">+</button>
            </div>
        </div>
    `;

    const itemsContainer = document.getElementById("items-container");

    article.items.forEach((item, idx) => {
        const itemEl = document.createElement("div");

        itemEl.classList.add("item-container");

        itemEl.id = `article-item-${idx}`;

        itemEl.setAttribute("data-specs-num", item.specs.length);

        let specsEl = "";

        for (let i = 0; i < item.specs.length; i++) {
            specsEl += `
                <div class="item-specs-container">
                    <button class="delete-btn" onclick="deleteSpec(${idx}, ${i})">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </button>
                    <div class="editor-group">
                        <h4>Name</h4>
                        <input type="text" id="article-item-${idx}-spec-${i}-name" placeholder="Name..." autocomplete="off" value="${item.specs[i].name}">
                    </div>
                    <div class="editor-group">
                        <h4>Value</h4>
                        <input type="text" id="article-item-${idx}-spec-${i}-value" placeholder="Value..." autocomplete="off" value="${item.specs[i].value}">
                    </div>
                </div>
            `;
        }

        itemEl.innerHTML = `
            <button class="delete-btn" onclick="deleteItem(${idx})">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <div class="editor-group">
                <h3>Name</h3>
                <input type="text" id="article-item-${idx}-name" placeholder="Name..." autocomplete="off" value="${item.name}">
            </div>
            <div class="editor-group">
                <h3>Image URL</h3>
                <input type="url" id="article-item-${idx}-image" placeholder="URL..." autocomplete="off" value="${item.image}">
            </div>
            <div class="editor-group">
                <h3>Rating / 5</h3>
                <input type="number" id="article-item-${idx}-rating" placeholder="Rating..." autocomplete="off" value="${item.rating}">
            </div>
            <div class="editor-group">
                <h3>Description</h3>
                <textarea id="article-item-${idx}-description" placeholder="Description...">${item.description}</textarea>
            </div>
            <div class="editor-group">
                <h3>Product Link</h3>
                <input type="url" id="article-item-${idx}-link" placeholder="Link..." autocomplete="off" value="${item.link}">
            </div>
            <div class="editor-group">
                <div class="specs-title">
                    <h3>Specs</h3>
                    <button onclick="addSpec(${idx})">+</button>
                </div>
                ${specsEl}
            </div>
        `;

        itemsContainer.append(itemEl);
    });
}

function urlElVal() {
    const articleUrlEl = document.getElementById("article-url");

    let val = articleUrlEl.value;

    val = val.toLowerCase()
        .replace("https:", "")
        .replace("thepcradar.com", "")
        .replace(" ", "-")
        .replace("/", "")
        .replace(".", "")
        .replace("'", "")
        .replace('"', "");

    articleUrlEl.value = val;
}

function setElVal(el, val) {
    document.getElementById(el).value = val;
}

function getItemSpecs(id) {
    let arr = [];

    const itemContainer = document.getElementById(`article-item-${id}`);

    for (let i = 0; i < parseInt(itemContainer.getAttribute("data-specs-num")); i++) {
        arr.push({
            name: valOfEl(`article-item-${id}-spec-${i}-name`),
            value: valOfEl(`article-item-${id}-spec-${i}-value`)
        });
    }

    return arr;
}

function getItems() {
    let arr = [];

    const itemsContainer = document.getElementById("items-container");

    for (let i = 0; i < parseInt(itemsContainer.getAttribute("data-items-num")); i++) {
        arr.push({
            name: valOfEl(`article-item-${i}-name`),
            image: valOfEl(`article-item-${i}-image`),
            rating: valOfEl(`article-item-${i}-rating`),
            description: valOfEl(`article-item-${i}-description`),
            link: valOfEl(`article-item-${i}-link`),
            specs: getItemSpecs(i)
        });
    }

    return arr;
}

function valOfEl(id) {
    return document.getElementById(id).value;
}

function reloadArticle() {
    const container = document.getElementById("article");

    const adEl = `
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9445635512536138" crossorigin="anonymous"></script>
        <!-- Display horizontal responsive -->
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9445635512536138" data-ad-slot="1830852105" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    `;

    document.getElementById("website-url").innerText = `thepcradar.com/article/${article.url || "no-url"}`;

    container.innerHTML = `
        <header>
            <h1>${article.title || "title"}</h1>
            <h3>${article.author || "author"}, ${article.date || "date"}</h3>
            <p>${article.introduction || "introduction"}</p>
        </header>

        ${adEl}
    `;

    article.items.forEach((item) => {
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
            specs += `<span><b>${spec.name || "spec name"}: </b>${spec.value || "spec value"}</span>`;
        });

        itemEl.innerHTML = `
            <h2>${item.name || "product name"}</h2>
            <div class="content">
                <div class="image">
                    <img src="${item.image || "/images/no-image.png"}"/>
                    <a href="${item.image}" target="_blank">Source</a>
                </div>
                <div class="info">
                    <div class="info-section">
                        <h4>Rating</h4>
                        <p><span>${ratings}</span>${item.rating}</p>
                    </div>
                    <div class="info-section">
                        <h4>Description</h4>
                        <p>${item.description || "item descripton"}</p>
                    </div>
                    <div class="info-section">
                        <h4>Specs</h4>
                        <p>${specs}</p>
                    </div>
                </div>
            </div>
            <button onclick="productLink('${item.link}', '${item.name}')">GET IT NOW</button>
        `;

        container.append(itemEl);
        container.innerHTML += adEl;
    });

    container.innerHTML += `
        <p class="conclusion">${article.conclusion || "conclusion"}</p>
        <div class="vote-container">
            <p>Like this article?</p>
            <div class="vote-button-container">
                <button class="vote-btn" id="upvote-btn" onclick="articleVote('${article.url}', 1)">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289L19.7071 14.2929C20.0976 14.6834 20.0976 15.3166 19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071L12 9.41421L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7Z"></path></g></svg>
                </button>
                <span id="vote-button-count">0</span>
                <button class="vote-btn" id="downvote-btn" onclick="articleVote('${article.url}', -1)">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"></path></g></svg>
                </button>
            </div>
        </div>
    `;
}

const uploadOverlayEl = document.getElementById("upload-overlay");
const uploadBoxEl = document.getElementById("upload-box");

document.body.addEventListener("dragover", (event) => {event.preventDefault(); uploadOverlayEl.classList.add("active");});
uploadBoxEl.addEventListener("dragleave", (event) => {event.preventDefault(); uploadOverlayEl.classList.remove("active");});
uploadBoxEl.addEventListener("drop", handleFileDrop);
uploadBoxEl.addEventListener("change", handleFile);

function handleFile(event) {
    event.preventDefault();

    uploadOverlayEl.style.display = "none";
    uploadOverlayEl.classList.remove("active");

    const file = event.target.files[0];

    readArticleFile(file, (err, obj) => {
        if (err) {
            console.error("Failed to read article file:", err);
        } else {
            createNewProject(obj);
        }
    });
}

function handleFileDrop(event) {
    event.preventDefault();

    uploadOverlayEl.classList.remove("active");

    const file = event.dataTransfer.files[0];

    const fileName = file.name.split(".");

    if (fileName[fileName.length - 1] !== "proj") {
        return;
    }

    readArticleFile(file, (err, obj) => {
        if (err) {
            console.error("Failed to read article file:", err);
        } else {
            createNewProject(obj);
        }
    });
}

function readArticleFile(file, callback) {
    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            // Get the Base64 text from file
            const base64Data = event.target.result;

            // Decode from Base64 back to JSON string
            const jsonString = decodeURIComponent(escape(atob(base64Data)));

            // Parse JSON back to object
            const obj = JSON.parse(jsonString);

            callback(null, obj);
        } catch (err) {
            callback(err, null);
        }
    };

    reader.onerror = function() {
        callback(reader.error, null);
    };

    // Read the file as text (since it's Base64 encoded)
    reader.readAsText(file);
}

function createNewProject(articleObj = JSON.parse(JSON.stringify(defaultProject))) {
    openArticle = createAritcleId();

    article = articleObj;

    allArticles[openArticle] = article;

    loadFromArticle();

    localStorage.setItem("article-projects", JSON.stringify(allArticles));

    closeLoadOptions();
}

function openLoadOptions() {
    const projectsContainer = document.getElementById("projects-container");

    projectsContainer.innerHTML = `
        <div class="project-btns">
            <button class="project-btn" onclick="createNewProject()">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 12H18M12 6V18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
            <button class="project-btn" onclick="uploadBoxEl.click()">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 17H17.01M15.6 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H8.4M12 15V4M12 4L15 7M12 4L9 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
        </div>
    `;

    for (const project in allArticles) {
        const projectEl = document.createElement("div");
        const projectOpenEl = document.createElement("button");

        const projectObj = allArticles[project];

        let openProject = "";

        if (project === openArticle.toString()) openProject = "<span class='open-tag'>Open</span> ";

        projectEl.className = "article-project";

        projectEl.addEventListener("click", (event) => {
            openArticle = project;
            article = projectObj;

            loadFromArticle();

            loadOptionsEl.style.display = "none";
        });

        projectEl.innerHTML = `
            <p>${openProject}${projectObj.projectName}</p>
        `;

        projectOpenEl.addEventListener("click", (event) => {
            event.stopPropagation();

            delete allArticles[project];

            if (openArticle == project) {
                createNewProject();
            } else {
                openLoadOptions();

                localStorage.setItem("article-projects", JSON.stringify(allArticles));
            }
        });

        projectOpenEl.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        `;

        projectEl.append(projectOpenEl);

        projectsContainer.append(projectEl);
    }

    loadOptionsEl.style.display = "flex";
}

function closeLoadOptions() {
    loadOptionsEl.style.display = "none";
}

function openExportOptions() {
    exportOptionsEl.style.display = "flex";
}

function closeExportOptions() {
    exportOptionsEl.style.display = "none";
}

function exportProject() {
    const jsonString = JSON.stringify(article);
    const base64Data = btoa(unescape(encodeURIComponent(jsonString)));

    const blob = new Blob([base64Data], { type: "application/octet-stream" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${article.projectName}.proj`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}

function exportArticle() {
    reloadArticle();

    articleEditorEl.innerHTML;

    const folderName = article.url;

    const zip = new JSZip();

    const folder = zip.folder(folderName);

    folder.file("index.html", `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <!-- Google tag (gtag.js) -->
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-02H64HMKWR"></script>
                <script>
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-02H64HMKWR');
                </script>

                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">

                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

                <title>${article.title} | The PC Radar</title>
                <meta name="description" content="${article.description}">

                <link rel="icon" type="image/x-icon" href="/favicon.svg">

                <link rel="stylesheet" href="/styles/general.css">
                <link rel="stylesheet" href="/styles/nav.css">
                <link rel="stylesheet" href="/styles/footer.css">
                <link rel="stylesheet" href="/styles/article.css">
                <link rel="stylesheet" href="/styles/popular.css">

                <script>window.articleId = "${article.url}";</script>
                <script src="/firebase.js" type="module"></script>
                <script src="/loader.js" defer></script>
                <script src="/article/firebase-buttons.js" defer></script>
            </head>
            <body>
                <nav id="navbar"></nav>

                <main class="article" id="article">
                    ${document.getElementById("article").innerHTML}
                </main>

                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9445635512536138" crossorigin="anonymous"></script>
                <!-- Display horizontal responsive -->
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9445635512536138" data-ad-slot="1830852105" data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>

                <h1 class="popular-subtitle">Popular</h1>
                <div class="popular-container" id="popular-container" data-size="3"></div>

                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9445635512536138" crossorigin="anonymous"></script>
                <!-- Display horizontal responsive -->
                <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9445635512536138" data-ad-slot="1830852105" data-ad-format="auto" data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>

                <footer id="footer"></footer>
            </body>
        </html>
    `);

    zip.generateAsync({ type: "blob" }).then(function(content) {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = `${folderName}.zip`;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}