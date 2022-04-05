// This is the section that will contain all of my information
const overview = document.querySelector(".overview");
// This is the section where the list of repos will go
const repoList = document.querySelector(".repo-list");

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
  getUserRepos();
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
  for (const repo of repoData) {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class = "repo">
        <h3>${repo.name}</h3>
    </div>`;
    repoList.append(li);
  }
};
