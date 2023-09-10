const API_KEY="pub_291504acf61d9d70a298369bb9c6e6e405e83&q=";
const url = "https://newsdata.io/api/1/news?";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}apiKey=${API_KEY}${query}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("templateNewscard");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);   //all divs cloning
        fillDataInCard(cardClone, article);                   
        cardsContainer.appendChild(cardClone);             //append cards in container
    });
}

function fillDataInCard(cardClone, article){
    const newsImg=cardClone.querySelector('#newsImg');
    const newsTitle=cardClone.querySelector('#newsTitle');
    const newsSource=cardClone.querySelector('#newsSource');
    const newsDesc=cardClone.querySelector('#newsDesc');

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML= `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);                   //news come on clicking on cricket, politics options of nav bar
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');    //active class as color becomes same on clicking till seeing that type of news
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active")
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");    // it do when we click option of navbar like cricket and then search anything on the search bar then after searching the news the option of navbar cannot show selected
    curSelectedNav = null;
});
