const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
var yazi = document.getElementById("yazi");
var icon = document.getElementById("icon");
var header = document.getElementById("header");
icon.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    icon.src = "assets/moon.png";
    header.style.color = "#2a2a72";
    yazi.style.color = "#2a2a72";
  } else {
    icon.src = "assets/sun.png";
    header.style.color = "#ddd2d2";
    yazi.style.color = "#ddd2d2";
  }
};
async function getUser(username) {
  const { data } = await axios(APIURL + username);
  createUserCard(data);
}
const btn = document.getElementById("btn");

// when tex type set button visible
search.addEventListener("input", () => {
  btn.style.visibility = "visible";
});
btn.addEventListener("click", () => {
  btn.style.visibility = "hidden";
});

function createUserCard(user) {
  const cardHTML = `
  <div>
  <p id="yazi" class="yazi">tam profili görmek için karta tıklayın</p>
  <a href="https://github.com/${user.login}" target="_blank=">
  <div class="card">
    <div>
    <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <b>${user.login}</b>
        <p>${user.bio}</p>
        <ul>
            <li>${user.followers}<strong>Takipçi</strong></li>
            <li>${user.following}<strong>Takip Edilen</strong></li>
            <li>${user.public_repos}<strong>Repository</strong></li>
        </ul>
    </div>
</div>
</a>


    `;
  main.innerHTML = cardHTML;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
