const ICON_PEN_TO_SQUARE = document.getElementById("icon-pen-to-square");
const ICON_CLOUD_X = document.getElementById("icon-cloud-x");
const ICON_PLAY = document.getElementById("icon-play");
const ICON_STOP = document.getElementById("icon-stop");
const ICON_USER = document.getElementById("icon-user");
const ICON_PLUS = document.getElementById("icon-plus");
const ICON_MINUS = document.getElementById("icon-minus");
const ICON_TRASH_UP_ARROW = document.getElementById("icon-trash-up-arrow");
const ICON_TRASH = document.getElementById("icon-trash");
const ICON_CANCEL = document.getElementById("icon-cancel");
const ICON_X_MARK = document.getElementById("icon-x-mark");
const ICON_CHECK = document.getElementById("icon-check");
const ICON_EXCLAMATION = document.getElementById("icon-exclamation");

async function createDidgYa(
    name,
    unit,
    quantity,
    inputs,
    timed,
    emoji,
    user,
    dailyGoal
) {
    if (quantity == "" || quantity == 0 || quantity == null) {
        unit = null;
        unitType = null;
        quantity = null;
    }

    if (!user) user = { id: "anon" };

    // const createToCloud = await createCloudDidgYa(name, unit, quantity, inputs, timed, unitType, emoji, user)
    // if (createToCloud) return makeToast(`An error occurred while creating the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    const createToLocal = createLocalDidgYa(
        name,
        unit,
        quantity,
        inputs,
        timed,
        emoji,
        user,
        dailyGoal
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

    const createToLocal = startLocalDidgYa(didgYaId, now);
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

    const deleteButton = document.getElementById("button-delete-view-DidgYa");
    deleteButton.addEventListener("click", () => {
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

    const editButton = document.getElementById("button-edit-view-DidgYa");
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        editDidgYa(didgYaId);
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
    }
}
function createInput(inputType, name, selects, index) {
    const div = document.createElement("div");
    div.classList.add("mb-5");

    const label = document.createElement("label");
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

    const input =
        inputType === "select"
            ? document.createElement(inputType)
            : document.createElement("input");
    input.id = `input-${index}-${name}`;

    if (inputType === "select") {
        input.classList.add(
            '"bg-gray-50',
            "border",
            "border-gray-300",
            "text-gray-900",
            "text-sm",
            "rounded-lg",
            "focus:ring-blue-500",
            "focus:border-blue-500",
            "block",
            "w-full",
            "p-2.5",
            "dark:bg-gray-700",
            "dark:border-gray-600",
            "dark:placeholder-gray-400",
            "dark:text-white",
            "dark:focus:ring-blue-500",
            "dark:focus:border-blue-500"
        );
        selects.forEach((element) => {
            const option = document.createElement("option");
            option.value = element.name;
            const icon = element.icon ? element.icon : false;
            let iconElement = document.createElement("span");

            if (icon) {
                iconElement.classList.add("mr-2");
                const iconSvg = setupSvgIcon(
                    eval(icon.name),
                    icon.width,
                    icon.height
                );
                if (icon.color) iconSvg.setAttribute("fill", icon.color);
                else
                    iconSvg.classList.add(
                        "text-text-light",
                        "dark:text-text-dark"
                    );
                iconElement.appendChild(iconSvg);
            }

            iconElement = iconElement ? iconElement : "";
            option.classList.add("shadow-md", "shadow-black");
            option.appendChild(iconElement);

            const nameElement = document.createElement("span");
            nameElement.innerHTML = element.name;
            option.appendChild(nameElement);

            input.append(option);
        });
    }

    if (inputType === "number") {
        input.classList.add(
            "bg-gray-50",
            "border",
            "border-gray-300",
            "text-gray-900",
            "text-sm",
            "rounded-lg",
            "focus:ring-blue-500",
            "focus:border-blue-500",
            "block",
            "w-full",
            "p-2.5",
            "dark:bg-gray-700",
            "dark:border-gray-600",
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

    div.appendChild(label);
    div.appendChild(input);
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
        const startTime = new Date(didgYa.records.last());
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
    if (didgYa.timed === true && didgYa.active === true)
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
        console.log(`Stopped ${didgYa.name} : ${didgYa.id}`);
        stopDidgYa(didgYa.id);
    });

    const buttonPlay = document.getElementById(`play-${didgYa.id}`);
    buttonPlay.addEventListener("click", function () {
        console.log(`Clicked ${didgYa.name} : ${didgYa.id}`);
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
        const startTime = new Date(didgYa.records.last());
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
function populateIcons() {
    const cancelIcons = document.querySelectorAll(".fa-cancel");
    cancelIcons.forEach((element) => {
        const svg = setupSvgIcon(ICON_CANCEL, "15");
        svg.classList.add("fill-text-light", "dark:fill-text-dark");
        element.replaceWith(svg);
    });
    const plusIcons = document.querySelectorAll(".fa-plus");
    plusIcons.forEach((element) => {
        const svg = setupSvgIcon(ICON_PLUS, "15");
        svg.classList.add("fill-text-light", "dark:fill-text-dark");
        element.replaceWith(svg);
    });
    const minusIcons = document.querySelectorAll(".fa-minus");
    minusIcons.forEach((element) => {
        const svg = setupSvgIcon(ICON_MINUS, "15");
        svg.classList.add("fill-text-light", "dark:fill-text-dark");
        element.replaceWith(svg);
    });
    const editIcons = document.querySelectorAll(".fa-pen-to-square");
    editIcons.forEach((element) => {
        const svg = setupSvgIcon(ICON_PEN_TO_SQUARE, "15");
        svg.classList.add("fill-text-light", "dark:fill-text-dark");
        element.replaceWith(svg);
    });
    const deleteIcons = document.querySelectorAll(".fa-trash");
    deleteIcons.forEach((element) => {
        const svg = setupSvgIcon(ICON_TRASH, "15");
        svg.classList.add("fill-text-light", "dark:fill-text-dark");
        element.replaceWith(svg);
    });
    const deleteAllIcons = document.querySelectorAll(".fa-trash-can-arrow-up");
    deleteAllIcons.forEach((element) => {
        const svg = setupSvgIcon(ICON_TRASH_UP_ARROW, "15");
        svg.classList.add("fill-text-light", "dark:fill-text-dark");
        element.replaceWith(svg);
    });
    const userIcon = document.querySelectorAll(".fa-user");
    userIcon.forEach((element) => {
        const svg = setupSvgIcon(ICON_USER, "15");
        svg.classList.add("fill-text-light", "dark:fill-text-dark");
        element.replaceWith(svg);
    });
}
