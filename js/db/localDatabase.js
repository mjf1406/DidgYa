function getAllLocalDidgYas() {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    if (didgYas == null) {
        return [];
    }
    return didgYas;
}
function getLocalDidgYaName(didgYaId) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((element) => element.id == didgYaId);
    return didgYas[didgYaIndex].name;
}
function getLocalStartTime(didgYaId) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((element) => element.id == didgYaId);
    return new Date(didgYas[didgYaIndex].records.last());
}
function isLocalDidgYaWithDuplicateName(name) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    return didgYas.some((element) => element.name == name) ? true : false;
}
function getLocalDidgyaByName(name) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((element) => element.name == name);
    return didgYas[didgYaIndex];
}
function getLocalDidgYa(didgYaId) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((element) => element.id == didgYaId);
    return didgYas[didgYaIndex];
}
function getTodaysRecords(records) {
    const now = new Date();
    records = records.filter((record) => {
        const recordDate = new Date(record.dt);
        return (
            recordDate.getDate() === now.getDate() &&
            recordDate.getMonth() === now.getMonth() &&
            recordDate.getFullYear() === now.getFullYear()
        );
    });
    return records;
}

// --- Insert and Update ---

function createLocalDidgYa(
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
    if (isLocalDidgYaWithDuplicateName(name)) return "error";

    const didgYaData = {
        id: generateId(),
        created_at: new Date(),
        name: name, // text
        unit: unit, // text
        quantity: quantity, // integer
        inputs: inputs, // array of inputs
        stopwatch: stopwatch, // boolean
        emoji: emoji, // text
        records: [], // array of records
        active: false, // boolean
        location: "local", // text
        dailyGoal: dailyGoal, // integer
        timer: timer, // number -- 0 is false
        user_id: user.id, // text
    };

    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    didgYas.push(didgYaData);
    localStorage.setItem("didgYas", JSON.stringify(didgYas));
    return didgYaData;
}
function deleteLocalDidgYa(didgYaId) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((i) => i.id == didgYaId);
    const name = didgYas[didgYaIndex].name;
    didgYas.splice(didgYaIndex, 1);
    localStorage.setItem("didgYas", JSON.stringify(didgYas));
}
async function startLocalDidgYa(didgYaId, now) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((i) => i.id == didgYaId);
    const didgYaData = didgYas[didgYaIndex];

    if (didgYaData.timer > 0) {
        let duration = parseInt(didgYaData.timer);
        duration = duration * SECOND;
        setTimer(duration);

        const modal = document.getElementById("modal-timer-DidgYa");
        modal.classList.remove("hidden");

        const cancelTimerButton = document.getElementById("cancel-timer");
        const cancelTimerNew = cancelTimerButton.replaceInPlace();

        cancelTimerNew.addEventListener("click", function (e) {
            e.preventDefault();

            cancelTimer();

            modal.classList.add("hidden");

            return makeToast(
                `You canceled ${didgYaData.emoji} <b>${didgYaData.name}</b>!`,
                "warning"
            );
        });

        const doneButton = document.getElementById("done-timer");
        const doneNew = doneButton.replaceInPlace();

        doneNew.addEventListener("click", function (e) {
            e.preventDefault();
            cancelTimer();
            modal.classList.add("hidden");

            didgYaData.records.push({ dt: now });

            didgYas[didgYaIndex] = didgYaData;
            localStorage.setItem("didgYas", JSON.stringify(didgYas));

            updateDidgYaDivById(didgYaId);

            return makeToast(
                `You DidgYa'd <b>${didgYaData.name}</b>!`,
                "success"
            );
        });

        const nameDiv = document.getElementById("DidgYa-timer-name");
        nameDiv.innerHTML = `${didgYaData.emoji} <b>${didgYaData.name}</b>`;

        transitionInterval = setInterval(() => {
            cancelTimer();

            didgYaData.records.push({ dt: now });

            didgYas[didgYaIndex] = didgYaData;
            localStorage.setItem("didgYas", JSON.stringify(didgYas));

            updateDidgYaDivById(didgYaId);

            return makeToast(
                `You DidgYa'd <b>${didgYaData.name}</b>!`,
                "success"
            );
        }, duration + SECOND);

        return;
    } else if (
        didgYaData.inputs == null ||
        didgYaData.inputs == undefined ||
        didgYaData.inputs.length == 0 ||
        !didgYaData.inputs
    ) {
        if (didgYaData.stopwatch == true) didgYaData.active = true;
        didgYaData.records.push({ dt: now });

        didgYas[didgYaIndex] = didgYaData;
        localStorage.setItem("didgYas", JSON.stringify(didgYas));

        return makeToast(`You DidgYa'd <b>${didgYaData.name}</b>!`, "success");
    }

    const modalContent = document.getElementById("modal-start-DidgYa-content");
    setUpStartModal(didgYaData, modalContent);

    const newElement = document
        .getElementById("button-start-DidgYa")
        .replaceInPlace();
    newElement.addEventListener("click", function eventHandler(e) {
        const missingInputs = [];
        const record = { dt: now };

        for (let index = 0; index < didgYaData.inputs.length; index++) {
            const element = didgYaData.inputs[index];
            const name = element.name;
            const node = document.getElementById(`input-${index}-${name}`);
            let value = node.value;
            if (element.type === "boolean") {
                value = document.getElementById(
                    `input-${index}-${name}`
                ).checked;
            }

            if (element.type != "boolean") {
                if (element.type === "select") {
                    value =
                        node.childNodes[0].childNodes[0].childNodes[0]
                            .innerText;
                }
                if (value.includes("Select")) missingInputs.push(name);
            }

            record[name] = value;
        }

        if (missingInputs.length > 0)
            return makeToast(
                `Please fill in the following fields: <b>${missingInputs.join(
                    ", "
                )}</b>`,
                "error"
            );

        const modal = document.getElementById("modal-start-DidgYa");
        modal.classList.add("hidden");

        if (didgYaData.stopwatch == true) didgYaData.active = true;
        didgYaData.records.push(record);

        didgYas[didgYaIndex] = didgYaData;
        localStorage.setItem("didgYas", JSON.stringify(didgYas));

        e.preventDefault();

        makeToast(`You DidgYa'd <b>${didgYaData.name}</b>!`, "success");
        updateDidgYaDivById(didgYaId);
    });
}
function stopLocalDidgYa(didgYaId, instance) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((i) => i.id == didgYaId);

    didgYas[didgYaIndex].records.last().endTime = instance.endTime;
    if (didgYas[didgYaIndex].stopwatch == true)
        didgYas[didgYaIndex].active = false;

    localStorage.setItem("didgYas", JSON.stringify(didgYas));
}

function addLocalDidgYaPreset(didgYa) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    didgYas.push(didgYa);
    localStorage.setItem("didgYas", JSON.stringify(didgYas));
}
