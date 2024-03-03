function buildDataTable(tableData) {
    var table = new Tabulator("#data-table", {
        data: tableData,
        layout: "fitDataTable",
        autoColumns: true,
        pagination: true,
        paginationSize: 5,
    });
}
function buildChart(chartData, didgYa) {
    const dataChart = document.getElementById("data-chart");

    if (chart) chart.destroy();

    chart = new Chart(dataChart, {
        type: "scatter", // Or 'line' if you prefer
        data: {
            datasets: [
                {
                    label: `${didgYa.emoji} ${didgYa.name}`,
                    data: chartData,
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 152, 0.2)",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "day",
                        displayFormats: {
                            day: "MMM D",
                        },
                    },
                    title: {
                        display: true,
                        text: "Date",
                    },
                },
                y: {
                    reverse: true,
                    ticks: {
                        // Format the tick labels to show time in HH:mm format
                        callback: (value) => {
                            const hours = Math.floor(value / 60);
                            const minutes = value % 60;
                            return `${hours
                                .toString()
                                .padStart(2, "0")}:${minutes
                                .toString()
                                .padStart(2, "0")}`;
                        },
                        stepSize: 60, // Change the step size if needed
                        min: 0, // Start at midnight
                        max: 1439, // End at 23:59
                    },
                    title: {
                        display: true,
                        text: "Time of Day",
                    },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const dateValue = context.raw.x;
                            const timeValue = context.raw.y;
                            const hours = Math.floor(timeValue / 60);
                            const minutes = timeValue % 60;
                            const date = new Date(dateValue);
                            date.setHours(hours, minutes);
                            const dateString = date.toLocaleDateString(
                                undefined,
                                { month: "short", day: "numeric" }
                            );
                            const timeString = date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            return `${context.dataset.label}: ${dateString} ${timeString}`;
                        },
                    },
                },
            },
        },
    });
}
function buildDescStats(records) {
    const descriptiveStatistics = computeDescStats(records);

    const weeklyAverageDiv = document.getElementById("weekly-average");
    weeklyAverageDiv.innerHTML = formatMillisecondsToReadable(
        descriptiveStatistics.mean
    );

    const dailyAveragesDiv = document.getElementById("daily-averages");
    dailyAveragesDiv.innerHTML = "";
    for (
        let index = 0;
        index < descriptiveStatistics.dailyAverages.length;
        index++
    ) {
        const element = descriptiveStatistics.dailyAverages[index];
        const div = document.createElement("div");
        let mean = element.mean;

        const meanString =
            isNaN(mean) == true
                ? "Insufficient data"
                : formatMillisecondsToReadable(mean);

        div.innerHTML = `<b>${element.date.toLocaleDateString()}</b>: ${meanString}`;
        dailyAveragesDiv.appendChild(div);
    }
}

function viewDidgYa(didgYaId) {
    const now = new Date();
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((element) => element.id == didgYaId);

    const didgYa = didgYas[didgYaIndex];

    const nameElements = document.getElementsByName("viewing-DidgYa");
    nameElements.forEach((element) => {
        element.innerHTML = `${didgYa.emoji} <b>${didgYa.name}</b>`;
    });

    const viewModal = document.getElementById("modal-view-DidgYa");
    viewModal.classList.remove("hidden");

    const deleteButtonOld = document.getElementById(
        "button-delete-view-DidgYa"
    );
    const deleteButton = deleteButtonOld.replaceInPlace();
    deleteButton.addEventListener("click", function () {
        const modal = document.getElementById("modal-delete-DidgYa");
        modal.classList.remove("hidden");

        const toBeDeletedNameElements = document.getElementsByName(
            "DidgYa-to-delete-name"
        );
        toBeDeletedNameElements.forEach((element) => {
            element.innerHTML = `the ${didgYa.emoji} <b>${didgYa.name}</b> DidgYa`;
        });

        const buttonDeleteDidgYa = document.getElementById(
            "button-delete-DidgYa"
        );
        buttonDeleteDidgYa.addEventListener("click", function (e) {
            e.preventDefault();

            deleteDidgYa(didgYaId);

            modal.classList.add("hidden");
            viewModal.classList.add("hidden");
        });
    });

    const editButtonOld = document.getElementById("button-edit-view-DidgYa");
    const editButton = editButtonOld.replaceInPlace();
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        editDidgYa(didgYaId);
    });

    const dashboardButtonOld = document.getElementById(
        "button-dashboard-view-DidgYa"
    );
    const dashboardButton = dashboardButtonOld.replaceInPlace();
    dashboardButton.addEventListener("click", (e) => {
        e.preventDefault();
        makeToast("Coming Soon!", "warning");
    });

    // --- Data Manipulation ---

    let records = didgYa.records;
    records.sort((a, b) => new Date(b.dt) - new Date(a.dt));
    records = records.filter((record) => {
        const date = new Date(record.dt);
        return date.toDateString() === now.toDateString(); // Adjust this call to match your actual implementation
    });

    // Data Table

    let transformedData = records.map((item) => {
        const dt = new Date(item.dt);
        const transformedItem = {
            ...item,
            dt: `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`,
        };
        return transformedItem;
    });

    buildDataTable(transformedData);

    // Custom Time
    const customTime = document.getElementById("custom-time");
    const dtLocal = now;
    dtLocal.setMinutes(dtLocal.getMinutes() - dtLocal.getTimezoneOffset());
    customTime.value = dtLocal.toISOString().slice(0, 16);

    flatpickr("#custom-time", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });

    const customTimeButton = document.getElementById(
        "button-do-custom-time-DidgYa"
    );
    customTimeButton.name = didgYaId;
    // Report

    const averageBetweenDiv = document.getElementById("daily-average-between");
    const avgBetween = computeAverageBetweenDidgYasForSingleDay(records);
    averageBetweenDiv.innerHTML =
        avgBetween === "Insufficient DidgYas today..."
            ? avgBetween
            : formatMillisecondsToReadable(avgBetween);

    const dailyGoalText = didgYa.dailyGoal
        ? `(${getDailyGoalText(records, didgYa)})`
        : "";
    const total = records.length;
    const totalDiv = document.getElementById("daily-total");
    const totalString = didgYa.dailyGoal
        ? `${total} / ${didgYa.dailyGoal} ${dailyGoalText}`
        : total;
    totalDiv.innerHTML = totalString;
}

// Data Chart
// let chartData = records.map((record) => {
//     const date = new Date(record.dt);
//     const minutesPastMidnight = date.getHours() * 60 + date.getMinutes();
//     return {
//         x: date.toLocaleDateString(),
//         y: minutesPastMidnight,
//     };
// });
// chartData = chartData.filter((i) => i != undefined);
// buildChart(chartData, didgYa);
