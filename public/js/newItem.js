document.addEventListener("DOMContentLoaded", function () {
    const itemForm = document.getElementById('itemForm')
    const token = localStorage.getItem('token')
    const submitButton = document.getElementById('submitButton')

    itemForm.addEventListener('submit', function(event){
        event.preventDefault()
        const name = document.getElementById('floatingName').value
        const brand = document.getElementById('floatingBrand').value
        const type = document.getElementById('floatingType').value
        const attack = document.getElementById('floatingAttack').value
        const defence = document.getElementById('floatingDefence').value
        const price = document.getElementById('floatingPrice').value
        
        const data = {
            name: name,
            brand: brand,
            type: type,
            atk: attack,
            def: defence,
            price: price
        }

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
      
            if (responseStatus==201){
              window.location.href="/shop.html"
          }
          };

        fetchMethod(currentUrl + "/api/shop",callback,'POST',data, token);

    })

  });