document.addEventListener("DOMContentLoaded", function () {
  loadMessage()

  const messageForm = document.getElementById("chat-form")

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const newMessage = document.getElementById("message")
    console.log(`new message: ${newMessage}`)
    e.preventDefault()
  
    const token = localStorage.getItem("token");
  
    const data = {
      message_text: newMessage.value
    }
  
    const postCallback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 201) {
        console.log(`successfully post new message`);
        loadMessage()
        newMessage.value = ''
      }
    };
  
    fetchMethod(currentUrl + `/api/messages`,postCallback,"POST",data,token);
  

  })

  $(document).delegate(".chat-btn", "click", function() {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, 'self');
  })
  
  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  })
})


// LOAD ALL MESSAGES
function loadMessage(){
  const message = document.getElementById("message");
  const chatLog = document.querySelector(".chat-logs");
  const token = localStorage.getItem("token");

  const callback = (responseStatus, responseData) => {
    chatLog.innerHTML = ``
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    responseData.forEach((Text) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-10";
      displayItem.innerHTML = `
      <div class="message" data-message-id="${Text.id}" data-user-id="${Text.user_id}" data-text="${Text.message_text}">
                    <div class="row">
                        <div class="col-lg-10 d-flex align-items-center text-wrap">
                            <p class="my-0 me-3 w-100 text-break" style="font-size: 2.0vh">${Text.username}</p>
                            <span class="text-muted" style="font-size: 1.3vh">${Text.created_at}</span>
                        </div>
                        <div class="col-lg-2 btn-group dropend">
                          <button type="button" class="btn btn-secondary dropdown-toggle bg-transparent border-0" style="color:#696969" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>                            
                          </button>
                          <ul class="dropdown-menu">
                          <li><button class="dropdown-item" data-message-id="${Text.id}" data-user-id="${Text.user_id}" data-text="${Text.message_text}" onClick="showEditModal(this)">Edit</button></li>
                          <li><a class="dropdown-item" id="deleteButton${Text.id}" href="#">Delete</a></li>
                          </ul>
                        </div>
                    </div>
                    <div class="row messageText">
                        <p class="text-break border-3 bg-white rounded py-2 ">${Text.message_text}</p>
                    </div>

                </div>
        `;
      chatLog.appendChild(displayItem);

      // delete message
      const TextId = Text.id;
      const deleteMessageById = document.getElementById(`deleteButton${TextId}`);

      const deleteCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 204) {
          window.location.reload();
          console.log(`Deleted message with id-${TextId}`);
        }
      };

      deleteMessageById.addEventListener("click", (event) => {
        event.preventDefault();

        fetchMethod(currentUrl + `/api/messages/${TextId}`,deleteCallback,"DELETE",null,token);
        loadMessage()
      });


    });
  }
  fetchMethod(currentUrl + "/api/messages", callback);


}



// edit modal
function showEditModal(e) {
  const token = localStorage.getItem("token");
  const editModal = new bootstrap.Modal(document.getElementById("editModal"), {})
  const editMessage = document.getElementById("updatedMessage")

  editMessage.value = e.dataset.text

  editModal.show()

  var saveChangesButton = document.getElementById('submitNewMessage')

  const editCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    // if (responseData == 400){
    //   fetchMethod(currentUrl + `/api/messages/${textId}`,deleteCallback,"DELETE",null,token);
    // }
    // else 
    if (responseStatus == 200) {
      editModal.hide()
      console.log(`edited message with id-${e.dataset.messaegeId}`);
      loadMessage()
    }
  };

  saveChangesButton.addEventListener("click", (event) => {
    event.preventDefault();

    const data ={
      user_id: e.dataset.userId,
      message_text: document.getElementById("updatedMessage").value
    }

    fetchMethod(currentUrl + `/api/messages/${e.dataset.messageId}`,editCallback,"PUT",data,token);
  });
}




















