const presetsDropdown = document.getElementById("presets-dropdown");
presetsDropdown.innerHTML = "";

const selectPreset = document.createElement("option");
selectPreset.value = "Select preset...";
selectPreset.innerText = "Select preset...";
presetsDropdown.appendChild(selectPreset);

for (let index = 0; index < PRESET_DIDGYAS.length; index++) {
    const element = PRESET_DIDGYAS[index];
    if (isLocalDidgYaWithDuplicateName(element.name)) continue;
    const option = document.createElement("option");
    option.value = element.name;
    option.id = element.id;
    option.innerText = element.emoji + " " + element.name;
    presetsDropdown.appendChild(option);
}

async function createDidgYa(
    name,
    unit,
    quantity,
    inputs,
    stopwatch,
    emoji,
    user,
    dailyGoal,
    timer
) {
    if (quantity == "" || quantity == 0 || quantity == null) {
        unit = null;
        unitType = null;
        quantity = null;
    }

    if (!user) user = { id: "anon" };

    // const createToCloud = await createCloudDidgYa(name, unit, quantity, inputs, stopwatch, unitType, emoji, user)
    // if (createToCloud) return makeToast(`An error occurred while creating the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    const createToLocal = createLocalDidgYa(
        name,
        unit,
        quantity,
        inputs,
        stopwatch,
        emoji,
        user,
        dailyGoal,
        timer
    );
    if (createToLocal === "error") return "error";
    appendDidgYaToList(createToLocal);
    makeToast(`The <b>${name}</b> DidgYa was created successfully!`, "success");
}
function deleteDidgYa(didgYaId) {
    const name = getLocalDidgYaName(didgYaId);

    // const deleteFromCloud = await deleteCloudDidgYa(didgYaId)
    // if (deleteFromCloud) return makeToast(`An error occurred while deleting the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    deleteLocalDidgYa(didgYaId);
    removeDidgYaFromList(didgYaId);
    makeToast(`The <b>${name}</b> DidgYa was deleted successfully!`, "success");
}
async function clickDidgYa(didgYaId) {
    const name = getLocalDidgYaName(didgYaId);
    const now = new Date();

    // const startInCloud = await startCloudDidgya(didgYaId, now)
    // if (startInCloud) return makeToast(`An error occurred while deleting the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    const createToLocal = await startLocalDidgYa(didgYaId, now);
    if (createToLocal === "error")
        makeToast(
            `An error occurred while starting the <b>${name}</b> DidgYa. Please try again in a moment.`,
            "error"
        );
    updateDidgYaDivById(didgYaId);
}
function stopDidgYa(didgYaId) {
    const name = getLocalDidgYaName(didgYaId);
    const endTime = new Date();
    const startTime = getLocalStartTime(didgYaId);
    const duration = endTime - startTime;

    const instance = {
        startTime: startTime,
        endTime: endTime,
    };

    // const stopInCloud = await stopCloudDidgya(didgYaId, instance)
    // if (stopInCloud) return makeToast(`An error occurred while deleting the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    stopLocalDidgYa(didgYaId, instance);
    makeToast(
        `You <b>${name}</b>'d for <i>${formatMillisecondsToReadable(
            duration,
            false
        )}</i>`,
        "success"
    );
    updateDidgYaDivById(didgYaId);
}
function editDidgYa(didgYaId) {
    const now = new Date();
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((element) => element.id == didgYaId);

    const didgYaData = didgYas[didgYaIndex];

    makeToast(`Editing <b>${didgYas[didgYaIndex].name}</b>!`, "success");
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

    // Data Table

    let records = didgYa.records;
    records.sort((a, b) => new Date(b.dt) - new Date(a.dt));

    let transformedData = records.map((item) => {
        const dt = new Date(item.dt);
        const transformedItem = {
            ...item,
            dt: `${dt.toLocaleDateString()} ${dt.toLocaleTimeString()}`,
        };
        return transformedItem;
    });

    var table = new Tabulator("#data-table", {
        data: transformedData,
        layout: "fitDataTable",
        autoColumns: true,
        pagination: true,
        paginationSize: 5,
    });

    // Data Chart

    let chartData = records.map((record) => {
        const date = new Date(record.dt);
        const isInWeek = isInCurrentWeek("sunday", date);
        if (isInWeek) {
            const minutesPastMidnight =
                date.getHours() * 60 + date.getMinutes();
            return {
                x: date.toLocaleDateString(),
                y: minutesPastMidnight,
            };
        }
    });
    chartData = chartData.filter((i) => i != undefined);
    console.log("🚀 ~ viewDidgYa ~ chartData:", chartData);

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

function populateDidgYaList(didgYas) {
    const now = new Date();
    didgYas.alphabetizeByKey("name");

    const didgYaList = document.getElementById("DidgYa-list");
    didgYaList.innerHTML = "";

    for (let i = 0; i < didgYas.length; i++) {
        const didgYa = didgYas[i];
        appendDidgYaToList(didgYa);
    }
}

function setUpStartModal(didgYaData, divToPopulate) {
    let customSelect;
    divToPopulate.innerHTML = "";
    const startDidgYaModal = document.getElementById("modal-start-DidgYa");
    const inputs = didgYaData.inputs;

    if (inputs.length > 0) {
        startDidgYaModal.classList.remove("hidden");

        const nameElements = document.getElementsByName("starting-DidgYa");
        nameElements.forEach((element) => {
            element.innerHTML = `${didgYaData.emoji} <b>${didgYaData.name}</b>`;
        });

        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            const name = element.name;
            const type = element.type;
            const options = element.options ? element.options : null;
            const input = createInput(type, name, options, index);
            divToPopulate.appendChild(input);
        }
        setCustomSelectListeners();
    }
}
function createInput(inputType, name, selects, index) {
    const div = document.createElement("div");
    div.classList.add("mb-5");

    let label = document.createElement("label");
    label.classList.add(
        "block",
        "mb-2",
        "text-sm",
        "font-medium",
        "text-gray-900",
        "dark:text-white"
    );
    label.innerHTML = name.toTitleCase();
    label.setAttribute("for", `input-${name}`);

    let input =
        inputType === "select"
            ? document.createElement(inputType)
            : document.createElement("input");
    input.id = `input-${index}-${name}`;

    if (inputType === "select") {
        customSelect = createCustomDropdown(name, selects, index);
    }

    if (inputType === "number") {
        input.classList.add(
            "bg-neutral-light",
            "dark:bg-highlight-dark/10",
            "text-gray-900",
            "text-sm",
            "rounded-lg",
            "focus:ring-blue-500",
            "focus:border-blue-500",
            "block",
            "w-full",
            "p-2.5",
            "dark:placeholder-gray-400",
            "dark:text-white",
            "dark:focus:ring-blue-500",
            "dark:focus:border-blue-500"
        );
        input.type = "number";
        input.min = 0;
        input.max = 1000;
        input.step = 1;
        input.placeholder = `Input ${name}...`;
    }

    if (inputType === "boolean") {
        input.type = "checkbox";
        input.classList.add("sr-only", "peer");

        label = document.createElement("label");
        label.for = `input-${index}-${name}`;
        label.classList.add(
            "relative",
            "inline-flex",
            "items-center",
            "cursor-pointer"
        );

        const div = document.createElement("div");
        div.classList.add(
            "w-11",
            "h-6",
            "bg-neutral-light",
            "peer-focus:outline-none",
            "peer-focus:ring-4",
            "peer-focus:ring-blue-300",
            "dark:peer-focus:ring-blue-800",
            "rounded-full",
            "peer",
            "dark:bg-neutral-dark",
            "peer-checked:after:translate-x-full",
            "rtl:peer-checked:after:-translate-x-full",
            "peer-checked:after:border-white",
            "after:content-['']",
            "after:absolute",
            "after:top-[2px]",
            "after:start-[2px]",
            "after:bg-white",
            "after:border-gray-300",
            "after:border",
            "after:rounded-full",
            "after:h-5",
            "after:w-5",
            "after:transition-all",
            "dark:border-gray-600",
            "peer-checked:bg-blue-600"
        );

        const span = document.createElement("span");
        span.classList.add(
            "text-sm",
            "font-medium",
            "text-gray-900",
            "ms-3",
            "dark:text-gray-300"
        );
        span.innerText = name;

        label.appendChild(input);
        label.appendChild(div);
        label.appendChild(span);
    }

    if (inputType === "select") div.appendChild(customSelect);
    if (inputType === "number") div.appendChild(input);
    if (inputType === "boolean") div.appendChild(label);
    return div;
}
function createDidgYaGetInputs() {
    const inputs = [];

    const inputsChildren = document.getElementById("inputs-list").children;
    const inputsChildNodes = document.getElementById("inputs-list").childNodes;
    console.log(
        "🚀 ~ createDidgYaGetInputs ~ inputsChildNodes:",
        inputsChildNodes
    );

    for (let index = 0; index < inputsChildNodes.length; index++) {
        const element = inputsChildNodes[index];
        const inputId = element.childNodes[0].id;
        const inputName = element.childNodes[1].value;
        const inputType = element.childNodes[2].value;
        let options = [];

        if (inputType === "select") {
            const optionsUser = document.getElementById(
                `${inputId}-options-list`
            ).children;
            console.log("🚀 ~ createDidgYaGetInputs ~ options:", optionsUser);
            for (let index = 0; index < optionsUser.length; index++) {
                const element = optionsUser[index];
                const optionName = element.childNodes[1].value;
                options.push({
                    name: optionName,
                });
            }
        }

        inputs.push({
            id: inputId,
            name: inputName,
            type: inputType,
            options: options,
        });
    }
    return inputs;
}
function removeDidgYaFromList(didgYaId) {
    const didgYa = document.getElementById(`DidgYa-${didgYaId}`);
    didgYa.remove();
}
function appendDidgYaToList(didgYa) {
    const now = new Date();
    const didgYaList = document.getElementById("DidgYa-list");

    const didgYaListItem = document.createElement("div");
    didgYaListItem.classList.add("didgya-list-item");
    didgYaListItem.id = `DidgYa-${didgYa.id}`;

    const emoji = document.createElement("div");
    emoji.classList.add("text-2xl", "cursor-pointer");
    emoji.id = `emoji-${didgYa.id}`;
    if (didgYa.emoji || didgYa.emoji != "") emoji.innerHTML = didgYa.emoji;
    else {
        emoji.innerHTML = "🤷";
        emoji.classList.add("opacity-0");
    }
    didgYaListItem.appendChild(emoji);

    const text = document.createElement("div");
    text.classList.add("text"); // .didgya-list-item .text

    // Name and Quantity + Unit
    const nameQuantity = document.createElement("div");
    nameQuantity.id = `name-quantity-${didgYa.id}`;
    nameQuantity.classList.add("name-quantity"); // .didgya-list-item .name-quantity

    if (didgYa.name) {
        const name = document.createElement("span");
        name.classList.add("text-base");
        name.id = `name-${didgYa.id}`;
        name.innerHTML = didgYa.name;
        nameQuantity.appendChild(name);
    }
    if (didgYa.quantity > 0) {
        const quantity = document.createElement("span");
        quantity.classList.add("text-2xs");
        quantity.id = `quantity-${didgYa.id}`;
        quantity.innerHTML = `(${didgYa.quantity} ${didgYa.unit})`;
        nameQuantity.appendChild(quantity);
    }
    if (didgYa.active === true) {
        const active = document.createElement("span");
        active.classList.add("text-xs");
        active.id = `active-${didgYa.id}`;
        const startTime = new Date(didgYa.records.last().dt);
        const now = new Date();
        let elapsedTime = now - startTime;
        active.innerHTML = `(${formatMillisecondsToReadable(
            elapsedTime,
            false
        )})`;
        setInterval(() => {
            elapsedTime += 1000;
            active.innerHTML = `(${formatMillisecondsToReadable(
                elapsedTime,
                false
            )})`;
        }, 1000);
        nameQuantity.appendChild(active);
    }
    text.appendChild(nameQuantity);

    const performedToday = document.createElement("div");
    performedToday.classList.add("text-xs");
    performedToday.id = `performedToday-${didgYa.id}`;
    performedToday.innerHTML = getPerformedTodayInnerHTML(didgYa);
    text.appendChild(performedToday);

    didgYaListItem.appendChild(text);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons"); // .didgya-list-item .buttons

    const stop = document.createElement("span");
    stop.classList.add(
        "text-supporting-light",
        "dark:text-supporting-dark",
        "cursor-pointer",
        "hover:text-supporting-light/80",
        "dark:hover:text-supporting-dark/80"
    );
    stop.id = `stop-${didgYa.id}`;
    const svgStop = setupSvgIcon(ICON_STOP, "25");
    stop.appendChild(svgStop);
    stop.classList.add("hidden");
    svgStop.classList.add("fill-supporting-light", "dark:fill-supporting-dark");
    if (didgYa.stopwatch === true && didgYa.active === true)
        stop.classList.remove("hidden");
    buttons.appendChild(stop);

    const play = document.createElement("span");
    play.classList.add(
        "text-secondary-light",
        "dark:text-secondary-dark",
        "cursor-pointer",
        "hover:text-secondary-light/80",
        "dark:hover:text-secondary-dark/80"
    );
    const svgPlay = setupSvgIcon(ICON_PLAY, "25");
    play.appendChild(svgPlay);
    svgPlay.classList.add("fill-secondary-light", "dark:fill-secondary-dark");
    play.id = `play-${didgYa.id}`;
    if (didgYa.active === true) play.classList.add("hidden");
    buttons.appendChild(play);

    didgYaListItem.appendChild(buttons);

    const location = document.createElement("div");
    location.classList.add("text-xs", "self-start", "justify-start");
    location.name = "DidgYa-location";
    location.id = `location-${didgYa.id}`;
    if (didgYa.location === "local") {
        const svg = setupSvgIcon(ICON_CLOUD_X, "15");
        svg.classList.add(
            "fill-highlight-light/80",
            "dark:fill-highlight-dark/80"
        );
        location.appendChild(svg);
    }
    if (didgYa.location === "cloud") {
        location.classList.add("text-primary-light", "dark:text-primary-dark");
        location.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
    }
    didgYaListItem.appendChild(location);

    didgYaList.appendChild(didgYaListItem);

    // --- Listeners ---

    emoji.addEventListener("click", function () {
        viewDidgYa(didgYa.id);
    });
    text.addEventListener("click", function () {
        viewDidgYa(didgYa.id);
    });

    const buttonStop = document.getElementById(`stop-${didgYa.id}`);
    buttonStop.addEventListener("click", function () {
        stopDidgYa(didgYa.id);
    });

    const buttonPlay = document.getElementById(`play-${didgYa.id}`);
    buttonPlay.addEventListener("click", function () {
        clickDidgYa(didgYa.id);
    });

    const locationMessage =
        didgYa.location === "local"
            ? `The <b>${didgYa.name}</b> DidgYa is stored <i><b>locally</b></i> and is only accessible through this browser`
            : `The <b>${didgYa.name}</b> DidgYa is stored in the <i><b>cloud</b></i>`;
    tippy(location, {
        content: locationMessage,
        allowHTML: true,
    });
}
function updateDidgYaDivById(didgYaId) {
    const didgYa = getLocalDidgYa(didgYaId);

    const performedToday = document.getElementById(
        `performedToday-${didgYaId}`
    );
    performedToday.innerHTML = "";
    performedToday.innerHTML = getPerformedTodayInnerHTML(didgYa);

    const buttonStop = document.getElementById(`stop-${didgYa.id}`);
    const buttonPlay = document.getElementById(`play-${didgYa.id}`);

    if (didgYa.active === true) {
        const nameQuantity = document.getElementById(
            `name-quantity-${didgYaId}`
        );
        const active = document.createElement("span");
        active.classList.add("text-xs");
        active.id = `active-${didgYa.id}`;
        const startTime = new Date(didgYa.records.last().dt);
        const now = new Date();
        let elapsedTime = now - startTime;
        active.innerHTML = `(${formatMillisecondsToReadable(
            elapsedTime,
            false
        )})`;
        setInterval(() => {
            elapsedTime += 1000;
            active.innerHTML = `(${formatMillisecondsToReadable(
                elapsedTime,
                false
            )})`;
        }, 1000);
        nameQuantity.appendChild(active);

        buttonStop.classList.remove("hidden");
        buttonPlay.classList.add("hidden");
    } else {
        const active = document.getElementById(`active-${didgYa.id}`);
        if (active) {
            active.remove();
            buttonStop.classList.add("hidden");
            buttonPlay.classList.remove("hidden");
        }
    }
}

function getPerformedTodayInnerHTML(didgYa) {
    const todaysRecords = getTodaysRecords(didgYa.records);
    const numberOfRecords = todaysRecords.length;

    const dailyGoal = didgYa.dailyGoal ? ` / ${didgYa.dailyGoal}` : ``;
    let timeString = numberOfRecords == 1 ? "time" : "times";
    timeString = didgYa.dailyGoal ? "times" : timeString;

    let quantityElement = "";
    if (didgYa.quantity > 1) {
        const quantity = didgYa.quantity;
        const dailyGoal = didgYa.dailyGoal;
        const consumedToday = quantity * numberOfRecords;
        const goalConsumption = quantity * dailyGoal;

        quantityElement = ` (<b>${consumedToday.toLocaleString()} / ${goalConsumption.toLocaleString()}</b> ${
            didgYa.unit
        })`;
    }

    return `<b>${todaysRecords.length}${dailyGoal}</b> ${timeString} today ${quantityElement}`;
}
function getDidgYaPreset(didgYaName) {
    return PRESET_DIDGYAS.find((i) => i.name === didgYaName);
}
function setupIntro() {
    const intro = document.getElementById("DidgYa-intro");
    const showIntro = localStorage.getItem("show-intro");

    if (!showIntro) {
        localStorage.setItem("show-intro", "false");
    } else if (showIntro === "false") {
        intro.classList.add("hidden");
    } else {
        intro.classList.remove("hidden");
    }
}
