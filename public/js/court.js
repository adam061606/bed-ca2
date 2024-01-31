document.addEventListener("DOMContentLoaded", function () {
    
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const floatingSelectPlayer1 = document.getElementById("floatingSelectPlayer1");
      const floatingSelectPlayer2 = document.getElementById("floatingSelectPlayer2");
  
      if (responseStatus == 404 || responseStatus == 400) {
        console.log(`court page error: ${responseData.message}`);
        return;
      }
  
      responseData.forEach((Player) => { 
        const displayItem = document.createElement("option"); // create options for dropdown
        displayItem.value = Player.id
        displayItem.textContent = Player.name
        console.log(displayItem)

        // add options into select form 
        floatingSelectPlayer2.appendChild(displayItem);
        floatingSelectPlayer1.appendChild(displayItem);

        }); 

    }
    fetchMethod(currentUrl + `/api/player`, callback, "GET");

});


function selectedPlayer(e){
    // e.preventDefault()
    const token = localStorage.getItem("token");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
    a = Math.floor(Math.random() * 5) + 1;
    playerStats = document.getElementById('playerStats')
    playerStats.innerHTML = ``

    const displayItem = document.createElement("div"); // load 3 random items
    displayItem.className =
    "";
    displayItem.innerHTML = `
    <img src="../graphics/badmintonPics/badmintonPic${a}.jpg" class="img-thumbnail" alt="badminton player">
    <div class="card">
    <div class="card-body">
        <h3 class="card-title text-decoration-underline d-flex justify-content-center"><strong>${responseData.name}</strong></h3>
        <p class="card-text">
            Level:       ${responseData.level} <br>
            PlayType:    ${responseData.PlayType} <br>
            Specialty:   ${responseData.specialty} <br>
            Racket:      ${responseData.racket} <br>
            Shoe:        ${responseData.shoe} <br>
            Shirt:       ${responseData.shirt} <br>
            Pants:       ${responseData.pants} <br>
            Created On:  ${responseData.created_on} <br>
        </p>
    </div>
    </div>

    `;
    playerStats.appendChild(displayItem);
    }

    fetchMethod(currentUrl + `/api/player/${e.value}`, callback, "GET", null, token);

}

function challenge(){
    const token = localStorage.getItem("token");
    const player1Id = document.getElementById("floatingSelectPlayer1").value;
    const player2Id = document.getElementById("floatingSelectPlayer2").value;
    console.log(player1Id)
    console.log(player2Id)
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 404 || responseStatus == 400) {
            console.log(`challenge error: ${responseData.message}`);
            return;
        }

        if (responseStatus == 204){ // game created successfully
            // show result modal 
            const resultModal = document.getElementById("resultModal");
            resultModal.style.display = "block";
            resultModal.innerHTML = `
            <div class="modal-dialog model-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Result</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <h5 class="modal-title" id="exampleModalLabel">${responseData.message}</h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
            </div>
            `;
        }
 
    }
    fetchMethod(currentUrl + `/api/court/${player1Id}/${player2Id}`, callback, "POST", null, token);
}
