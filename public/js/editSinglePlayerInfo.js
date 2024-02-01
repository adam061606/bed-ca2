document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const playerId = urlParams.get("player_id");
    const token = localStorage.getItem("token");
    

  
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
          <select class="form-select" id="floatingSelectGridracket" value="${responseData.racket}" data-type='racket'>

          </select>          
          <label for="floatingInput">racket</label>
        </div> 
        <div class="form-floating mb-3">
        <select class="form-select" id="floatingSelectGridshoe" value="${responseData.shoe}" data-type='shoe'>
          
        </select>           
        <label for="floatingInput">shoe</label>
        </div>             
        <div class="form-floating mb-3">
        <select class="form-select" id="floatingSelectGridshirt" value="${responseData.shirt}" data-type='shirt'>
          
        </select>           
        <label for="floatingInput">shirt</label>
        </div> 
        <div class="form-floating mb-3">
        <select class="form-select" id="floatingSelectGridpants" value="${responseData.pants}" data-type='pants'>
          
        </select>           
        <label for="floatingInput">pants</label>
        </div> 

        <button type="button" class="btn btn-primary" id="saveUpdatedPlayer">Save changes</button>
      </form>
      `;

      // get item by type for the dropdown list

      selectRacket = document.getElementById('floatingSelectGridracket')
      selectShoe = document.getElementById('floatingSelectGridshoe')
      selectShirt = document.getElementById('floatingSelectGridshirt')
      selectPants = document.getElementById('floatingSelectGridpants')

      selectType = [selectRacket, selectShoe, selectShirt, selectPants]
      
      console.log(selectType)

      for (let  i=0 ;i<selectType.length;i++){
        // itemType = e.dataset.type
        // console.log(itemType)

        const callbackForItemType  = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
  
          const typeDropdown = selectType[i]
        
          responseData.forEach((item) => { 
              const displayItem = document.createElement("option"); // create options for dropdown
              displayItem.value = item.name
              displayItem.textContent = item.name
              console.log(displayItem)
      
              // add options into select form 
              typeDropdown.appendChild(displayItem);
              }); 
          
      }
        
        fetchMethod(currentUrl + `/api/shop/type/${selectType[i].dataset.type}`, callbackForItemType, "GET", null, token);
      }

      // fetchMethod(currentUrl + `/api/shop/type/${itemType}`, callbackForItemType, "GET", null, token);




      // save changes to player 
      const saveUpdatedPlayer = document.getElementById('saveUpdatedPlayer')
      saveUpdatedPlayer.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('floatingInputName')
        const level = document.getElementById('floatingInputLevel')
        const specialty = document.getElementById('floatingSelectGridSpecialty')
        const racket = document.getElementById('floatingSelectGridracket')
        const shoe = document.getElementById('floatingSelectGridshoe')
        const shirt = document.getElementById('floatingSelectGridshirt')
        const pants = document.getElementById('floatingSelectGridpants')

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

