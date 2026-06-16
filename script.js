const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Display habits
function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${habit.completed ? "completed" : ""}">
                ${habit.name}
            </span>

            <div class="actions">
                <button onclick="toggleHabit(${index})">
                    ${habit.completed ? "Undo" : "Done"}
                </button>

                <button onclick="deleteHabit(${index})">
                    Delete
                </button>
            </div>
        `;

        habitList.appendChild(li);
    });
}

// Save to localStorage
function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// Add Habit (CREATE)
addBtn.addEventListener("click", () => {

    const habitName = habitInput.value.trim();

    if (habitName === "") {
        alert("Please enter a habit");
        return;
    }

    habits.push({
        name: habitName,
        completed: false
    });

    saveHabits();
    renderHabits();

    habitInput.value = "";
});

// Update Habit (UPDATE)
function toggleHabit(index) {

    habits[index].completed = !habits[index].completed;

    saveHabits();
    renderHabits();
}

// Delete Habit (DELETE)
function deleteHabit(index) {

    habits.splice(index, 1);

    saveHabits();
    renderHabits();
}

// Initial render (READ)
renderHabits();
