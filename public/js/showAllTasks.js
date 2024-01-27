
document.addEventListener("DOMContentLoaded", function () {
  const taskSubmitButton = document.getElementById("taskSubmitButton");
  const token = localStorage.getItem("token");

  taskSubmitButton.addEventListener("click", function () {
      const titleInput = document.getElementById("title").value;
      const descriptionInput = document.getElementById("Description-text").value;
      const pointsInput = document.getElementById("points").value;

      const data = {
          title: titleInput,
          description: descriptionInput,
          points: pointsInput,
      };
  
      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 201) {
          window.location.reload();
        }
      };
  
      fetchMethod(currentUrl + "/api/tasks", callback, "POST", data, token); // Perform signup request
    });

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("taskList");
      responseData.forEach((Task) => { // create individual task cards
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
            <a type="button" id="taskCompleteButton${Task.task_id}" class="btn card-link2">Completed</a>
            <a type="button" id="taskDeleteButton${Task.task_id}" class="btn card-link">Delete</a>
        </div>
    </li>
        
          `;
      
      playerList.appendChild(displayItem);

      const task_id = Task.task_id;
      const taskDeleteButton = document.getElementById(`taskDeleteButton${task_id}`);

      const deleteCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 204) {
          window.location.reload();
          console.log(`Deleted task ${task_id}`);
        }
      };

      taskDeleteButton.addEventListener("click", () => {
        fetchMethod(currentUrl + `/api/tasks/${task_id}`,deleteCallback,"DELETE",null,token);
      });

      // Completed Button JS
      const completedTaskButton = document.getElementById(`taskCompleteButton${task_id}`);

      const completeTaskCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
          window.location.reload();
          console.log("Posted into Task Progress!");
        }
      };

      completedTaskButton.addEventListener("click", () => {
        const data = {
          task_id: task_id,
        };
        console.log(`TASK ID ${task_id}`);
        fetchMethod(currentUrl + `/api/task_progress/`,completeTaskCallback,"POST", data, token);
      });


      });
    };
  
    fetchMethod(currentUrl + "/api/tasks", callback);
  });