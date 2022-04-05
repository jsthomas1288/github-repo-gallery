// This is the section that will contain all of my information
const overview = document.querySelector(".overview");

const username = "jsthomas1288";

const getUserInfo = async function () {
  const request = await fetch(`https://api.github.com/users/${username}`);
  const data = await request.json();
  console.log(data);
  displayUserInfo(data);
  console.log(overview);
};

getUserInfo();

const displayUserInfo = function (data) {
  const userInfo = document.createElement("user-info");
  userInfo.innerHTML = `
  <figure>
    <img alt = "user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name} </p>
    <p><strong>Bio:</strong> ${data.bio} </p>
    <p><strong>Location:</strong> ${data.location} </p>
    <p><strong>Number of public repos:</strong> ${data.public_repos} </p>
  </div>`;
  overview.append(userInfo);
};
