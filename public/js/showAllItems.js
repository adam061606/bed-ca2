document.addEventListener("DOMContentLoaded", function () {

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      randomId=[]
      for (let i=0 ;i<3;i++){
        a = Math.floor(Math.random() * responseData.length+1)
        if (randomId.filter((id) => id == a).length == 0) {
          randomId.push(a);
        } else i--
      }
  
      const shopList = document.getElementById("shopList");
      shopList.innerHTML=''
      console.log(randomId)
      responseData.forEach((item) => {
        if (randomId.filter((id)=> id == item.id).length == 0) {
          return
        }
        const displayItem = document.createElement("div");
        displayItem.className =
        "col-md-4 col-sm-6 col-xs-12 p-3";
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
                <a href="#" class="btn btn-primary">Buy</a>
            </div>
        </div>
          `;
          shopList.appendChild(displayItem);
      });
    };

    fetchMethod(currentUrl + "/api/shop", callback);

    const gatcha = document.getElementById('gatcha')
    gatcha.addEventListener('click',() =>{
      console.log('successfully refreshed shop')
      fetchMethod(currentUrl + "/api/shop", callback);
    })

  });



  