let newsData = [];
let currentArticle = null;

// Format date for display
function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("-");
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Load news list from JSON
async function loadNewsList() {
  try {
    const response = await fetch("NewsList.json");
    if (!response.ok) throw new Error("Failed to load news list");

    newsData = await response.json();
    renderNewsList();

    // Load the latest article by default
    if (newsData.length > 0) {
      const latestDate = newsData[newsData.length - 1];
      loadArticle(latestDate);
    }
  } catch (error) {
    console.error("Error loading news list:", error);
    document.getElementById("news-list").innerHTML =
      '<li class="error">❌ Failed to load news list</li>';
  }
}

// Render the news list in sidebar
function renderNewsList() {
  const newsList = document.getElementById("news-list");
  newsList.innerHTML = "";

  // Reverse to show latest first
  const reversedNews = [...newsData].reverse();

  reversedNews.forEach((dateStr, index) => {
    const li = document.createElement("li");
    li.className = "news-item";
    li.dataset.date = dateStr;

    li.innerHTML = `
                    <span class="date">${formatDate(dateStr)}</span>
                    <span class="title">Daily News ${
                      index === 0 ? "(Latest)" : ""
                    }</span>
                `;

    li.addEventListener("click", () => loadArticle(dateStr));
    newsList.appendChild(li);
  });
}

// Load specific article
async function loadArticle(dateStr) {
  const loadingEl = document.getElementById("loading");
  const contentEl = document.getElementById("markdown-content");
  const errorEl = document.getElementById("error");
  const currentDateEl = document.getElementById("current-date");

  // Update active state in sidebar
  document.querySelectorAll(".news-item").forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.date === dateStr) {
      item.classList.add("active");
    }
  });

  // Show loading state
  loadingEl.style.display = "block";
  contentEl.style.display = "none";
  errorEl.style.display = "none";

  // Update current date display
  currentDateEl.textContent = formatDate(dateStr);
  currentArticle = dateStr;

  try {
    const filename = `News/${dateStr}_News.md`;
    const response = await fetch(filename);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const markdownText = await response.text();
    const htmlContent = marked.parse(markdownText);

    // Hide loading, show content
    loadingEl.style.display = "none";
    contentEl.innerHTML = htmlContent;
    contentEl.style.display = "block";
  } catch (error) {
    console.error("Error loading article:", error);

    // Hide loading, show error
    loadingEl.style.display = "none";
    errorEl.style.display = "block";
    errorEl.innerHTML = `
                    <h3>❌ Error Loading Article</h3>
                    <p>Could not load the article for ${formatDate(
                      dateStr
                    )}.</p>
                    <p><small>File: News/${dateStr}_News.md</small></p>
                `;
  }
}

// Initialize the app
document.addEventListener("DOMContentLoaded", loadNewsList);
