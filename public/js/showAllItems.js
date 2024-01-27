document.addEventListener("DOMContentLoaded", function () {

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("shopList");
      responseData.forEach((item) => {
        const displayItem = document.createElement("div");
        displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">
                    Brand: ${item.brand} <br>
                    Type: ${item.type} <br>
                    Attack: ${item.atk} <br>
                    Defence: ${item.def} <br>
                    Price: ${item.price} points
                </p>
                <a href="" class="btn btn-primary">Buy</a>
            </div>
        </div>
          `;
        playerList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/shop", callback);
  });