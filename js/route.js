// =======> main variables;
let category = document.querySelectorAll(".nav-link");
let container = document.getElementById("dataContainer");
let load = document.getElementById("load");
let gDetails = document.getElementById("g-details");
let gImg = document.getElementById("g-img");
let gTitle = document.getElementById("g-title");
let gCategory = document.getElementById("g-category");
let gPlatform = document.getElementById("g-platform");
let gStatus = document.getElementById("g-status");
let gDesc = document.getElementById("g-desc");
let gBtn = document.getElementById("g-btn");
let gClose = document.getElementById("g-close");
let cat = "mmorpg";
let item = document.querySelectorAll("#dataContainer > div");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0d6c112edcmsh361ae409c9b2d32p156a1ejsn7232b36b5876",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

// ======> loading;
function showLoad() {
  load.classList.replace("d-none", "d-flex");
}
function hiddenLoad() {
  load.classList.replace("d-flex", "d-none");
}

// =====> show [mmorpg] data by default
(async function init() {
  let allData = await getData(cat);
  display(allData);
})();

// =====> main functions
async function getData(category) {
  let response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    options
  );
  let allData = await response.json();
  return allData;
}

function display(data) {
  let box = ``;
  data.forEach((ele) => {
    box += `<div class="col-xl-3 col-lg-4 col-md-6" data-id="${
      ele.id
    }" role="button">
    <div class="box border border-dark rounded-2 d-flex flex-column justify-content-between h-100">
      <div class="inner p-3">
        <img src="${ele.thumbnail}" class="w-100 rounded-2" />
        <div
          class="head d-flex align-items-center justify-content-between py-2"
        >
          <p>${ele.title}</p>
          <button class="btn btn-primary">Free</button>
        </div>
        <p class="text-center text-break opacity-50">
          ${ele.short_description.split(" ").slice(0, 8).join(",")}
        </p>
      </div>
      <div
        class="foot d-flex align-items-center justify-content-between border-top border-dark p-3 h-10"
      >
        <p class="mb-0 bg-foot p-1 rounded-2 fw-bold">${ele.genre}</p>
        <p class="mb-0 bg-foot p-1 rounded-2 fw-bold">${ele.platform}</p>
      </div>
    </div>
    </div>`;
  });
  container.innerHTML = box;
  items = document.querySelectorAll("#dataContainer > div");
  showDetails(items);
  hiddenLoad();
}
category.forEach((ele) => {
  ele.addEventListener("click", async function () {
    showLoad();
    category.forEach((ele) => {
      ele.classList.remove("active");
    });
    ele.classList.add("active");
    cat = ele.dataset.category;
    let allData = await getData(cat);
    display(allData);
  });
});

// =====> details
function showDetails(items) {
  items.forEach((ele) => {
    ele.addEventListener("click", async function () {
      showLoad();
      let response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${ele.dataset.id}`,
        options
      );
      let allData = await response.json();
      console.log(allData);
      displayDetails(allData);
      hiddenLoad();
    });
  });
}
function displayDetails(item) {
  gImg.src = item.thumbnail;
  gCategory.innerHTML = item.genre;
  gTitle.innerHTML = item.title;
  gPlatform.innerHTML = item.platform;
  gStatus.innerHTML = item.status;
  gDesc.innerHTML = item.description;
  gBtn.addEventListener("click", function () {
    console.log(item.game_url);
    open(item.game_url, "blank");
  });
  gDetails.classList.replace("d-none", "d-block");
  document.body.style.overflowY = "hidden";
}
gClose.addEventListener("click", function () {
  gDetails.classList.replace("d-block", "d-none");
  document.body.style.overflowY = "auto";
});
