document.addEventListener("DOMContentLoaded", function () {

  const playerList = document.getElementById("navbar");
  const displayItem = document.createElement("div");
  displayItem.className =
    "container";
  displayItem.innerHTML = `
  <a class="navbar-brand" href="index.html"
  ><img src='../graphics/heart.png'
    class="logo"
/></a>
<button
  class="navbar-toggler float-end"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarNav"
  aria-controls="navbarNav"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
  <!-- me-auto: margin-right: auto -->
  <ul class="navbar-nav me-auto">
    <li class="nav-item">
      <a class="nav-link" href="index.html">Home</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="player.html">Players</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="shop.html">Shop</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="task.html">Task</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="court.html">Court</a>
    </li>
  </ul>
</div>
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ms-auto">
    <li class="nav-item border d-flex center rounded-corners mx-2" id="pointBox">
      <p id="pointLabel" class="m-1"></p>
      <a href="" class="">
        <img class="coin right" src="https://pngimg.com/uploads/coin/coin_PNG36871.png" alt="Coin PNG image" title="Coin PNG image">
      </a>
    </li>
    <li class="nav-item">
      <a id="profileButton" href="profile.html" class="nav-link">Profile</a>
    </li>
    <li class="nav-item">
      <a id="logoutButton" href="#" class="nav-link">Logout</a>
    </li>
    <li class="nav-item">
      <a id="loginButton" href="login.html" class="nav-link">Login</a>
    </li>
    <li class="nav-item">
        <a id="registerButton" class="nav-link text-bg-dark" href="register.html">Register!</a>

    </li>
  </ul>
</div>


<!--  https://codepen.io/shivapandey/pen/dWdRYM -->
<div id="body z-1"> 
<div id="chat-circle" class="btn btn-raised">
  <div id="chat-overlay"></div>
  <i class="fa-regular fa-comments"></i>	    
</div>
<div class="chat-box z-1">
  <div class="chat-box-header">
    Public Chat
    <span class="chat-box-toggle"><i class="fa-solid fa-xmark"></i></span>
  </div>
  <div class="chat-box-body">
    <div class="chat-box-overlay">   
    </div>
    <div class="chat-logs z-1">
 
    </div><!--chat-log -->
  </div>
  <div class="chat-input">      
    <form id="chat-form" class="d-flex">
      <input type="text" class="w-75 text-break px-3 border-0 " id="message" placeholder="Send a message..."/>
      <button type="submit" class="w-25 btn" id="chat-submit"><i class="fa-solid fa-turn-up"></i></button>
    </form>      
  </div>
</div>
</div>
    `;
  playerList.appendChild(displayItem);







    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const profileButton = document.getElementById("profileButton");
    const logoutButton = document.getElementById("logoutButton");
    const pointBox = document.getElementById("pointBox")
    const pointLabel = document.getElementById('pointLabel')


    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);    
      pointLabel.innerText=''
      pointLabel.innerText=`${responseData.points}`
    }
    fetchMethod(currentUrl + `/api/users/${-1}`, callback, "GET",null, token);

    if (token) {
      // Token exists, show profile button and hide login and register buttons
      loginButton.classList.add("d-none");
      registerButton.classList.add("d-none");
      profileButton.classList.remove("d-none");
      logoutButton.classList.remove("d-none");
      pointBox.classList.remove('d-none');

    } else {
      // Token does not exist, show login and register buttons and hide profile and logout buttons
      loginButton.classList.remove("d-none");
      registerButton.classList.remove("d-none");
      profileButton.classList.add("d-none");
      logoutButton.classList.add("d-none");
      pointBox.classList.add('d-none');
    }
  
    logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });

  });