const contents = document.querySelector("#contents");
const loading = document.querySelector(".progress");

// Get news by newsAPI.org
const getNews = async () => {
  const apiKey = "e048aec5172840b997668269ebd30c4f";
  const url = `https://newsapi.org/v2/top-headlines?country=th&pageSize=100&apiKey=${apiKey}`;

  const newsResponse = await fetch(url);
  const newsData = await newsResponse.json();

  return newsData.articles;
};

const printNews = async () => {
  const news = await getNews();
  console.log(news);
  addDataToDom(news);
  addDataToDom(news);
  addDataToDom(news);
};

// Store last news
let lastestNews = 0;
// Render data to DOM
function addDataToDom(newsArticles) {
  if (lastestNews !== newsArticles.length) {
    const newsElement = document.createElement("div");
    newsElement.classList.add("card");
    newsElement.innerHTML = `
      <div class="card-content">
        <span class="card-title">${newsArticles[lastestNews].title}</span>
        <p>${newsArticles[lastestNews].description}</p>
      </div>
      <div class="card-action">
        <span>ที่มา - ${newsArticles[lastestNews].source.name}</span>
        <a href="${newsArticles[lastestNews].url}" target="_blank"> อ่านต่อ </a>
      </div>
    `;

    // Add news
    contents.appendChild(newsElement);

    // Remove loading
    loading.classList.remove("show");

    // update latest news
    lastestNews++;
  } else {
    // Unattach event listeners if no more docs
    window.removeEventListener("scroll", handleScroll);
    // Remove loading
    loading.classList.remove("show");
  }
}

// Handle scroll
const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 5) {
    // Show the loading animation
    loading.classList.add("show");
    // Add more news data
    setTimeout(printNews, 1000);
  }
};

// Wait for DOM content to load
window.addEventListener("DOMContentLoaded", () => {
  printNews();
  // addDataToDom();
  // addDataToDom();
  // addDataToDom();
});

// Load more news with scroll eventlistener
window.addEventListener("scroll", handleScroll);
