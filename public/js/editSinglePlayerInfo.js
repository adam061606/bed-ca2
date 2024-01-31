document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const playerId = urlParams.get("player_id");
    const token = localStorage.getItem("token");
    currentUrl

  
    const callbackForPlayerInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerInfo = document.getElementById("editPlayerForm");
  
      if (responseStatus == 404 || responseStatus == 400) {
        playerInfo.innerHTML = `${responseData.message}`;
        return;
      }
  
      playerInfo.innerHTML = `
      <form id="editPlayerInfoForm" class="col-lg-6 col-md-9 col-sm-12 mx-auto">
      <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInputName" value="${responseData.name}">
          <label for="floatingInput">Name</label>
      </div>
      <div class="form-floating mb-3">
          <input type="number" class="form-control" id="floatingInputLevel" value="${responseData.level}">
          <label for="floatingInput">level</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="floatingSelectGridSpecialty" value="${responseData.specialty}">
          <option value="1">smash</option>
          <option value="2">net</option>
          <option value="3">lob</option>
          <option value="4">drop</option>
          <option value="5">lift</option>
        </select>
        <label for="floatingSelectGrid">Specialty</label>
      </div>
      <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInputRacket" value="${responseData.racket}">
          <label for="floatingInput">racket</label>
      </div> 
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInputShoe" value="${responseData.shoe}">
        <label for="floatingInput">shoe</label>
      </div>             
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInputShirt" value="${responseData.shirt}">
        <label for="floatingInput">shirt</label>
      </div> 
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInputPants" value="${responseData.pants}">
        <label for="floatingInput">pants</label>
      </div> 

      <button type="button" class="btn btn-primary" id="submitNewMessage">Save changes</button>
  </form>
      `;

      const submitNewMessage = document.getElementById('submitNewMessage')
      submitNewMessage.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('floatingInputName')
        const level = document.getElementById('floatingInputLevel')
        const specialty = document.getElementById('floatingSelectGridSpecialty')
        const racket = document.getElementById('floatingInputRacket')
        const shoe = document.getElementById('floatingInputShoe')
        const shirt = document.getElementById('floatingInputShirt')
        const pants = document.getElementById('floatingInputPants')

        const data ={
            name: name.value,
            level: level.value,
            specialty: specialty.value,
            racket: racket.value,
            shoe: shoe.value,
            shirt: shirt.value,
            pants: pants.value
        }
        console.log(data)

        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus==204){
            window.location.href = currentUrl+ '/player.html'
          }
        }
        fetchMethod(currentUrl + `/api/player/${playerId}`, callback, "PUT", data, token);

      });
    };
  
    fetchMethod(currentUrl + `/api/player/${playerId}`, callbackForPlayerInfo, "GET", null, token);
  });