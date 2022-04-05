// This is the section that will contain all of my information
const overview = document.querySelector(".overview");
// This is the section where the list of repos will go
const repoList = document.querySelector(".repo-list");
// This is the section where all the repo info appears
const repoInfoSection = document.querySelector(".repos");
// This is the section where all the repo data appears
const repoDataSection = document.querySelector(".repo-data");
const button = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const username = "jsthomas1288";

const getUserInfo = async function () {
  const request = await fetch(`https://api.github.com/users/${username}`);
  const userData = await request.json();
  console.log(userData);
  displayUserInfo(userData);
  console.log(overview);
};

getUserInfo();

const displayUserInfo = function (userData) {
  const userInfo = document.createElement("user-info");
  userInfo.innerHTML = `
  <div class = "user-info">
    <figure>
        <img alt = "user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${userData.name} </p>
        <p><strong>Bio:</strong> ${userData.bio} </p>
        <p><strong>Location:</strong> ${userData.location} </p>
        <p><strong>Number of public repos:</strong> ${userData.public_repos} </p>
    </div>
</div>`;
  overview.append(userInfo);
  getUserRepos(username);
};

const getUserRepos = async function () {
  const requestRepo = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
  );
  const repoData = await requestRepo.json();
  console.log(repoData);
  displayUserRepos(repoData);
  console.log(repoList);
};

const displayUserRepos = function (repoData) {
  filterInput.classList.remove("hide");
  for (const repo of repoData) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
    button.classList.remove("hide");
  }
});

const getRepoInfo = async function (repoName) {
  const requestSpecificRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await requestSpecificRepo.json();
  console.log(repoInfo);
  //   This is to identify the languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  //   console.log(languageData);

  const languages = [];
  for (const languagesList in languageData) {
    languages.push(languagesList);
  }
  console.log(languages);
  displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
  repoDataSection.innerHTML = "";
  repoDataSection.classList.remove("hide");
  repoInfoSection.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class = "visit" href = "${
    repoInfo.svn_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoDataSection.append(div);
};

button.addEventListener("click", function (e) {
  if (e.target.matches("button")) {
    repoInfoSection.classList.remove("hide");
    repoDataSection.classList.add("hide");
    button.classList.add("hide");
  }
});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  //   console.log(searchText);
  const repos = document.querySelectorAll(".repo");
  const lowercase = searchText.toLowerCase();

  for (let repo of repos) {
    const repoText = repo.innerText.toLowerCase();
    if (repoText.includes(lowercase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
