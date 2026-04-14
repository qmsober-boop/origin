const products = [
  { name: "iPhone 15 128GB", platform: "京东", price: 5199, shipping: "包邮", rating: 4.8, url: "https://www.jd.com" },
  { name: "iPhone 15 128GB", platform: "淘宝", price: 5099, shipping: "满99包邮", rating: 4.7, url: "https://www.taobao.com" },
  { name: "iPhone 15 128GB", platform: "拼多多", price: 4988, shipping: "包邮", rating: 4.6, url: "https://www.pinduoduo.com" },
  { name: "戴森吹风机 HD15", platform: "京东", price: 2899, shipping: "包邮", rating: 4.9, url: "https://www.jd.com" },
  { name: "戴森吹风机 HD15", platform: "苏宁", price: 2799, shipping: "包邮", rating: 4.8, url: "https://www.suning.com" },
  { name: "华为 MateBook 14", platform: "淘宝", price: 5899, shipping: "包邮", rating: 4.7, url: "https://www.taobao.com" },
  { name: "华为 MateBook 14", platform: "京东", price: 5999, shipping: "包邮", rating: 4.8, url: "https://www.jd.com" },
  { name: "小米空气净化器 4", platform: "拼多多", price: 899, shipping: "包邮", rating: 4.6, url: "https://www.pinduoduo.com" },
  { name: "小米空气净化器 4", platform: "苏宁", price: 959, shipping: "满199包邮", rating: 4.5, url: "https://www.suning.com" }
];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const platformFilter = document.getElementById("platformFilter");
const sortBy = document.getElementById("sortBy");
const results = document.getElementById("results");
const summary = document.getElementById("summary");

const yuan = (price) => `¥${price.toLocaleString("zh-CN")}`;

const escapeHtml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

function getFilteredData() {
  const keyword = searchInput.value.trim().toLowerCase();
  const platform = platformFilter.value;
  const sort = sortBy.value;

  const list = products.filter((item) => {
    const keywordMatch = !keyword || item.name.toLowerCase().includes(keyword);
    const platformMatch = platform === "all" || item.platform === platform;
    return keywordMatch && platformMatch;
  });

  if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
  else if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
  else if (sort === "ratingDesc") list.sort((a, b) => b.rating - a.rating);

  return list;
}

function render() {
  const list = getFilteredData();

  if (list.length === 0) {
    summary.textContent = "未找到匹配商品，请尝试更换关键词或筛选条件。";
    results.innerHTML = "";
    return;
  }

  const prices = list.map((item) => item.price);
  summary.textContent = `共找到 ${list.length} 个商品，最低价 ${yuan(Math.min(...prices))}，最高价 ${yuan(Math.max(...prices))}。`;

  results.innerHTML = list
    .map(
      (item) => `
      <article class="card">
        <div class="card-top">
          <h2 class="product-name">${escapeHtml(item.name)}</h2>
          <span class="platform">${item.platform}</span>
        </div>
        <div class="price-line">
          <span class="label">价格</span>
          <strong class="price">${yuan(item.price)}</strong>
        </div>
        <div class="meta">
          <span>${item.shipping}</span>
          <span>⭐ ${item.rating}</span>
        </div>
        <a class="buy-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="前往 ${item.platform} 查看 ${escapeHtml(item.name)}">查看商品</a>
      </article>
      `
    )
    .join("");
}

searchBtn.addEventListener("click", render);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") render();
});
platformFilter.addEventListener("change", render);
sortBy.addEventListener("change", render);

render();
