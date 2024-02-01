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
        floatingSelectPlayer1.appendChild(displayItem.cloneNode(true));
        floatingSelectPlayer2.appendChild(displayItem.cloneNode(true));

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

        if (e.dataset.playerId == 1) {
            playerStats = document.getElementById('playerStats1')
        }
        else {  
            playerStats = document.getElementById('playerStats2')
        }
        
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


    const resultModal = new bootstrap.Modal(document.getElementById('resultModal'), {})

    const challengeModalLabel = document.getElementById("challengeModalLabel");

    
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 404 || responseStatus == 400) {
            console.log(`challenge error: ${responseData.message}`);
            return;
        }

        if (responseStatus == 409){
            challengeModalLabel.innerText = `${responseData.message}`
            challengeModalLabel.className = 'd-flex mx-auto h2'
            resultModal.show()
        }

        if (responseStatus == 200){ // game created successfully
            // show result modal            
            const courtInsertId = responseData.insertId || responseData[0].insertId

            const courtCallback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
     

                challengeModalLabel.className = 'd-flex mx-auto h2'
                if (responseData.winner == "Draw"){
                    challengeModalLabel.innerText = `Its a DRAW!`
                }
                else if (responseData.winner == responseData.player1){
                    challengeModalLabel.innerText = `PLAYER 1 WON!`
                } 
                else if (responseData.winner == responseData.player2){
                    challengeModalLabel.innerText = `PLAYER 2 WON!`
                }
                resultModal.show()

            }
            fetchMethod(currentUrl + `/api/court/${courtInsertId}`, courtCallback, "GET", null, token);

        }
    }
    fetchMethod(currentUrl + `/api/court/${player1Id}/${player2Id}`, callback, "POST", null, token);

}
