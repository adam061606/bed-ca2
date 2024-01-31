document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem('token')
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("playerList");
      responseData.forEach((player) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${player.name}</h5>
                  <p class="card-text">
                      Level: ${player.level}
                  </p>
                  <a href="getSinglePlayerInfo.html?player_id=${player.id}" class="btn btn-primary">View Details</a>
                  <a href="editSinglePlayerInfo.html?player_id=${player.id}" class="btn btn-success mt-3">Edit Details</a>
                  <button type='button' class="btn btn-danger mt-3" id='deletePlayer${player.id}'>Delete</button>

              </div>
          </div>
          `;
        playerList.appendChild(displayItem);

        const deletePlayer = document.getElementById(`deletePlayer${player.id}`)
        deletePlayer.addEventListener('click', (e) => {
          console.log(deletePlayer)
          e.preventDefault();
          const id = player.id
          const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus == 204) {
              window.location.reload();
              console.log(`Deleted player ${id}`);
            }
          };
          fetchMethod(currentUrl + `/api/player/${id}`, callback, "DELETE", null, token);
        })
      });

    };
  
    fetchMethod(currentUrl + "/api/player", callback);
  });