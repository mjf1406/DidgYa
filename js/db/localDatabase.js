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
function getLocalDidgYa(didgYaId) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    const didgYaIndex = didgYas.findIndex((element) => element.id == didgYaId);
    return didgYas[didgYaIndex];
}
function getTodaysRecords(records) {
    const now = new Date();
    records.filter((record) => {
        const recordDate = record.isString()
            ? new Date(record)
            : new Date(record.dt);
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
    timed,
    emoji,
    user,
    dailyGoal
) {
    if (isLocalDidgYaWithDuplicateName(name)) return "error";

    const didgYaData = {
        id: generateId(),
        created_at: new Date(),
        name: name, // text
        unit: unit, // text
        quantity: quantity, // integer
        inputs: inputs, // array of inputs
        timed: timed, // boolean
        emoji: emoji, // text
        records: [], // array of records
        active: false, // boolean
        timedInstances: [], // array of timed instances
        location: "local", // text
        dailyGoal: dailyGoal, // integer
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

    if (
        didgYaData.inputs == null ||
        didgYaData.inputs == undefined ||
        didgYaData.inputs.length == 0 ||
        !didgYaData.inputs
    ) {
        if (didgYaData.timed == true) didgYaData.active = true;
        didgYaData.records.push(now);

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
        const variables = [];
        for (let index = 0; index < didgYaData.inputs.length; index++) {
            const element = didgYaData.inputs[index];
            const name = element.name;
            const node = document.getElementById(`input-${index}-${name}`);
            const value = node.value;
            if (value.includes("Select")) missingInputs.push(name);
            variables.push({
                name: name,
                value: value,
            });
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

        if (didgYaData.timed == true) didgYaData.active = true;
        didgYaData.records.push({
            dt: now,
            variables: variables,
        });

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

    didgYas[didgYaIndex].timedInstances.push(instance);
    if (didgYas[didgYaIndex].timed == true) didgYas[didgYaIndex].active = false;

    localStorage.setItem("didgYas", JSON.stringify(didgYas));
}

function addLocalDidgYaPreset(didgYa) {
    const didgYas = JSON.parse(localStorage.getItem("didgYas"));
    didgYas.push(didgYa);
    localStorage.setItem("didgYas", JSON.stringify(didgYas));
}
