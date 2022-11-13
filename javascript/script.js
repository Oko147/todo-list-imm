{
  let tasks = [
    {
      content: "Zrobić ciasto",
    },
    {
      content: "Kupić chleb",
    },
  ];

  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];

    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");
    toggleDoneButtons.forEach((toggleDone, index) => {
      toggleDone.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const allTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };

  const renderTask = () => {
    const tasksToHTML = (task) => `
    <li class="list__item ${
      task.done && hideDoneTasks ? "list__item--hidden" : ""
    } js-list">
    <button class="js-done list__button list__button--done">
    ${task.done ? "✓" : ""}
      </button>
        <div class="list__content ${task.done ? " list__content--done" : ""}">
        ${task.content}
        </div>
        <button class="js-remove list__button list__button--remove">🗑</button>
    </li>
    `;

    const listElement = document.querySelector(".js-tasks");
    listElement.innerHTML = tasks.map(tasksToHTML).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector("js-headerButtons");

    if (tasks.length) {
      buttonsElement.innerHTML = `<button class="headerButtons__buttons js-hideDoneTasksButton">
              ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="headerButtons__buttons js-doneAllTasksButton"
            ${tasks.every(({ done }) => done) ? " disabled" : ""}>
              Ukończ wszystkie
            </button>`;

      return;
    }

    buttonsElement.innerHTML = ``;
  };

  const bindButtonsEvents = (taskIndex) => {
    const hideDoneTasksButton = document.querySelector(
      "js-hideDoneTasksButton"
    );

    if (hideDoneTasksButton) {
      hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }

    const doneAllTasksButton = document.querySelector("js-doneAllTasksButton");

    if (doneAllTasksButton) {
      doneAllTasksButton.addEventListener("click", allTasksDone);
    }
  };

  const render = () => {
    renderTask();
    bindEvents();
    bindButtonsEvents();
    renderButtons();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
    document.querySelector(".js-newTask").value = ``;
    document.querySelector(".js-newTask").focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
