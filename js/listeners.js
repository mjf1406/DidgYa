const unitTypes = document.getElementsByName("modal-create-DidgYa-unit-type");
unitTypes.forEach((element) => {
    element.addEventListener("change", function () {
        if (this.checked == false) return;
        const unitTypeSelect = document.getElementById(
            "modal-create-DidgYa-unit"
        );
        const type = this.id.replace("modal-create-DidgYa-", "").toUpperCase();
        unitTypeSelect.innerHTML = "";

        eval(type).forEach((element) => {
            const option = document.createElement("option");
            option.value = element;
            option.innerText = element;
            unitTypeSelect.appendChild(option);
        });
    });
    if (element.checked == true) {
        const unitTypeSelect = document.getElementById(
            "modal-create-DidgYa-unit"
        );
        const type = element.id
            .replace("modal-create-DidgYa-", "")
            .toUpperCase();
        unitTypeSelect.innerHTML = "";

        eval(type).forEach((element) => {
            const option = document.createElement("option");
            option.value = element;
            option.innerText = element;
            unitTypeSelect.appendChild(option);
        });
    }
});

const buttonCreateDidgYa = document.getElementById("create-DidgYa");
buttonCreateDidgYa.addEventListener("click", async function (e) {
    e.preventDefault();

    const name = document.getElementById("modal-create-DidgYa-name");
    const unit = document.getElementById("modal-create-DidgYa-unit");
    const quantity = document.getElementById("modal-create-DidgYa-quantity");
    const emoji = document.getElementById("modal-create-DidgYa-emoji");
    const dailyGoal = document.getElementById("modal-create-DidgYa-daily-goal");
    const inputs = createDidgYaGetInputs();
    const timed = document.getElementById("modal-create-DidgYa-timed");
    const user = { id: null, name: null };

    const created = await createDidgYa(
        name.value,
        unit.value,
        quantity.value,
        inputs,
        timed.checked,
        emoji.value,
        user,
        dailyGoal.value
    );
    if (created == "error")
        return makeToast(
            `A Didgya with the name <b>${name.value}</b> already exists!`,
            "error"
        );

    name.value = "";
    emoji.value = "";
    unit.value = "";
    quantity.value = "";
    dailyGoal.value = "";
    timed.checked = false;

    const modal = document.getElementById("modal-create-DidgYa");
    modal.classList.add("hidden");
});

const buttonDeleteAllData = document.getElementById("delete-all-data");
buttonDeleteAllData.addEventListener("click", function (e) {
    e.preventDefault();

    localStorage.setItem("didgYas", JSON.stringify(DEFAULT_DIDGYAS));

    const modal = document.getElementById("modal-delete-all");
    modal.classList.add("hidden");

    const didgYas = getAllLocalDidgYas();
    populateDidgYaList(didgYas);
});

const buttonAddInput = document.getElementById("modal-create-DidgYa-add-input");
buttonAddInput.addEventListener("click", function (e) {
    e.preventDefault();

    const id = generateId();

    const inputList = document.getElementById("inputs-list");

    const inputContainer = document.createElement("div");
    inputContainer.classList.add("form-input-container");

    const inputId = document.createElement("div");
    inputId.classList.add("p-2", "shrink");
    inputId.innerText = "Input";
    inputId.id = id;

    const inputName = document.createElement("input");
    inputName.placeholder = "Input name...";
    inputName.classList.add("p-2", "shrink");
    inputName.id = `${id}-input-name`;

    const inputType = document.createElement("select");
    inputType.classList.add("p-2");
    inputType.id = `${id}-input-type`;

    INPUT_TYPES.forEach((element) => {
        const selectOption = document.createElement("option");
        selectOption.value = element;
        selectOption.innerText = element;
        inputType.appendChild(selectOption);
    });

    const optionsList = document.createElement("div");
    optionsList.classList.add("p-2", "hidden", "flex", "flex-col", "gap-2");
    optionsList.id = `${id}-options-list`;

    const addOptionButton = document.createElement("button");
    addOptionButton.classList.add(
        "hidden",
        "mt-3",
        "w-full",
        "text-text-light",
        "dark:text-text-dark",
        "bg-green-300",
        "hover:bg-green-800",
        "focus:ring-4",
        "focus:outline-none",
        "focus:ring-green-300",
        "font-medium",
        "rounded-lg",
        "text-sm",
        "px-5",
        "py-2.5",
        "text-center",
        "dark:bg-green-600",
        "dark:hover:bg-green-700",
        "dark:focus:ring-green-800"
    );
    addOptionButton.innerText = "Add option";
    addOptionButton.addEventListener("click", function (e) {
        e.preventDefault();

        const id = generateId();

        const optionContainer = document.createElement("div");
        optionContainer.classList.add("form-input-container");

        const optionId = document.createElement("div");
        optionId.innerText = "Option";
        optionContainer.appendChild(optionId);

        const optionName = document.createElement("input");
        optionName.placeholder = "Option name...";
        optionName.classList.add("p-2");
        optionName.id = `${id}-option-name`;
        optionContainer.appendChild(optionName);

        optionsList.appendChild(optionContainer);
    });

    inputType.addEventListener("change", function () {
        if (this.value == "select") {
            addOptionButton.classList.remove("hidden");
            optionsList.classList.remove("hidden");
        } else {
            addOptionButton.classList.add("hidden");
            optionsList.classList.add("hidden");
        }
    });

    inputContainer.appendChild(inputId);
    inputContainer.appendChild(inputName);
    inputContainer.appendChild(inputType);
    inputContainer.appendChild(optionsList);
    inputContainer.appendChild(addOptionButton);

    const deleteButton = document.createElement("button");

    inputList.appendChild(inputContainer);
});
