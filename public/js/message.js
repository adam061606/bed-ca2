// $(function() {
//     var INDEX = 0; 
//     $("#chat-submit").click(function(e) {
//       e.preventDefault();
//       var msg = $("#chat-input").val(); 
//       if(msg.trim() == ''){
//         return false;
//       }
//       generate_message(msg, 'self');
//       var buttons = [
//           {
//             name: 'Existing User',
//             value: 'existing'
//           },
//           {
//             name: 'New User',
//             value: 'new'
//           }
//         ];
//       setTimeout(function() {      
//         generate_message(msg, 'user');  
//       }, 1000)
      
//     })
    
//     function generate_message(msg, type) {
//       INDEX++;
//       var str="";
//       str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
//       str += "          <span class=\"msg-avatar\">";
//       str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
//       str += "          <\/span>";
//       str += "          <div class=\"cm-msg-text\">";
//       str += msg;
//       str += "          <\/div>";
//       str += "        <\/div>";
//       $(".chat-logs").append(str);
//       $("#cm-msg-"+INDEX).hide().fadeIn(300);
//       if(type == 'self'){
//        $("#chat-input").val(''); 
//       }    
//       $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
//     }  
    
//     function generate_button_message(msg, buttons){    
//       /* Buttons should be object array 
//         [
//           {
//             name: 'Existing User',
//             value: 'existing'
//           },
//           {
//             name: 'New User',
//             value: 'new'
//           }
//         ]
//       */
//       INDEX++;
//       var btn_obj = buttons.map(function(button) {
//          return  "              <li class=\"button\"><a href=\"javascript:;\" class=\"btn btn-primary chat-btn\" chat-value=\""+button.value+"\">"+button.name+"<\/a><\/li>";
//       }).join('');
//       var str="";
//       str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg user\">";
//       str += "          <span class=\"msg-avatar\">";
//       str += "            <img src=\"https:\/\/image.crisp.im\/avatar\/operator\/196af8cc-f6ad-4ef7-afd1-c45d5231387c\/240\/?1483361727745\">";
//       str += "          <\/span>";
//       str += "          <div class=\"cm-msg-text\">";
//       str += msg;
//       str += "          <\/div>";
//       str += "          <div class=\"cm-msg-button\">";
//       str += "            <ul>";   
//       str += btn_obj;
//       str += "            <\/ul>";
//       str += "          <\/div>";
//       str += "        <\/div>";
//       $(".chat-logs").append(str);
//       $("#cm-msg-"+INDEX).hide().fadeIn(300);   
//       $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
//       $("#chat-input").attr("disabled", true);
//     }
    
//     $(document).delegate(".chat-btn", "click", function() {
//       var value = $(this).attr("chat-value");
//       var name = $(this).html();
//       $("#chat-input").attr("disabled", false);
//       generate_message(name, 'self');
//     })
    
//     $("#chat-circle").click(function() {    
//       $("#chat-circle").toggle('scale');
//       $(".chat-box").toggle('scale');
//     })
    
//     $(".chat-box-toggle").click(function() {
//       $("#chat-circle").toggle('scale');
//       $(".chat-box").toggle('scale');
//     })
    
//   })
document.addEventListener("DOMContentLoaded", function () {
  const message = document.getElementById("message");
  const chatLog = document.querySelector(".chat-logs");
  const token = localStorage.getItem("token");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    responseData.forEach((Text) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-10";
      displayItem.innerHTML = `
      <div class="message" data-message-id="${Text.id}">
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
                          <li><a class="dropdown-item" id="editButton${Text.id}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</a></li>
                          <li><a class="dropdown-item" id="deleteButton${Text.id}" href="#">Delete</a></li>
                          </ul>
                        </div>
                    </div>
                    <div class="row messageText">
                        <p class="text-break border-3 bg-white rounded py-2 ">${Text.message_text}</p>
                    </div>
                    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel">
                      <div class="modal-dialog model-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">Edit message</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <form>
                            <div class="mb-3">
                              <label for="recipient-name" class="col-form-label">Edit message below:</label>
                              <input type="text" class="form-control" id="updatedMessage">${Text.message_text}
                            </div>
                          </form>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary" id="submitNewMessage">Save changes</button>
                        </div>
                      </div>
                    </div>
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
      });


      // edit modal 
      // var editModal = document.getElementById('editModal${Text.id}')
      var edittedMessage = document.getElementById('submitNewMessage')

      const editCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        // if (responseData == 400){
        //   fetchMethod(currentUrl + `/api/messages/${textId}`,deleteCallback,"DELETE",null,token);
        // }
        // else 
        if (responseStatus == 204) {
          window.location.reload();
          console.log(`edited message with id-${TextId}`);
        }
      };


      edittedMessage.addEventListener('shown.bs.modal', function () {
        const data ={
          user_id:Text.user_id,
          message_text: document.getElementById("updatedMessage").value
        }
  
        fetchMethod(currentUrl + `/api/messages/${textId}`,editCallback,"PUT",data,token);

      })
    });
  }
  fetchMethod(currentUrl + "/api/messages", callback);



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






















