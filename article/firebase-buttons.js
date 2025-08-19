const voteButtonCounterEl = document.getElementById("vote-button-count");
const upvoteBtnEl = document.getElementById("upvote-btn");
const downvoteBtnEl = document.getElementById("downvote-btn");

let articleVotes = 0;
let vote = parseInt(localStorage.getItem(`article-${article.id}-vote`)) || 0;

updateVoteBtns();

(async () => {
    articleVotes = await getArticleVote(article.id);
    voteButtonCounterEl.innerText = articleVotes;
})();

function productLink(link, name) {
    window.open(link);

    productClick(name);
}

function articleVote(article, change) {
    changeArticleVote(article, change - vote);

    articleVotes += change - vote;
    voteButtonCounterEl.innerText = articleVotes;

    vote = change;
    localStorage.setItem(`article-${article}-vote`, vote);

    updateVoteBtns();
}

function updateVoteBtns() {
    if (vote === 1) {
        upvoteBtnEl.classList.add("active");
        downvoteBtnEl.classList.remove("active");
    } else if (vote === -1) {
        upvoteBtnEl.classList.remove("active");
        downvoteBtnEl.classList.add("active");
    } else {
        upvoteBtnEl.classList.remove("active");
        downvoteBtnEl.classList.remove("active");
    }
}