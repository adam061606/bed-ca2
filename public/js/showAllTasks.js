
document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("taskList");
      responseData.forEach((Task) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <li class="card">
        <div>
            <h3 class="card-title">${Task.task_id}. ${Task.title}</h3>
            <div class="card-content">
                <p>${Task.description}</p>
                <p>Number of points: ${Task.points}</p>
            </div>
        </div>
        <div class="card-link-wrapper">
            <a href="getSingleTaskInfo.html?task_id=${Task.task_id}" class="card-link">Learn More</a>
        </div>
    </li>
        
          `;
        playerList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/tasks", callback);
  });