document.addEventListener("DOMContentLoaded", function () {
url = new URL(document.URL);
const urlParams = url.searchParams;
// const userId = urlParams.get("user_id");
// const userId = res.locals.userId;
const token = localStorage.getItem("token");

const callbackForUserInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const userInfo = document.getElementById("userInfo");

  if (responseStatus == 404 || responseStatus == 400) {
    userInfo.innerHTML = `${responseData.message}`;
    return;
  }

  userInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                    User ID: ${responseData.user_id} <br>
                    Username: ${responseData.username} <br>
                    Email: ${responseData.email} <br>
                </p>
            </div>
        </div>
    `;
};

const callbackForUserPlayers = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const playerList = document.getElementById("playerList");
  responseData.forEach((player) => {
    const displayItem = document.createElement("div");
    displayItem.className =
      "col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3";
    displayItem.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${player.character_name}</h5>
                <p class="card-text">
                    user_id: ${player.user_id} <br>
                    player_id: ${player.player_id} <br>
                    username: ${player.username} <br>
                    character_name: ${player.character_name} <br>
                    character_level: ${player.character_level} <br>
                    char_created_on: ${player.char_created_on} <br>
                    user_created_on: ${player.user_created_on}
                </p>
                <a href="singlePlayerInfo.html?player_id=${player.player_id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
        `;
    playerList.appendChild(displayItem);
  });
};

fetchMethod(currentUrl + `/api/users/${-1}`, callbackForUserInfo,'GET',null, token);
// fetchMethod(currentUrl + `/api/users/${-1}/player`, callbackForUserPlayers);
});