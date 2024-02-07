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
    inputContainer.id = `${id}-input-container`;

    const inputId = document.createElement("div");
    inputId.classList.add(
        "p-2",
        "shrink",
        "flex",
        "flex-row",
        "gap-2",
        "items-center"
    );

    const nameElement = document.createElement("span");
    nameElement.innerHTML = "Input";

    const deleteButton = document.createElement("button");
    deleteButton.id = `${id}-delete-input`;
    const deleteIcon = setupSvgIcon(ICON_TRASH, 15, 15);
    deleteIcon.classList.add("fill-accent-light", "dark:fill-accent-dark");
    deleteButton.addEventListener("click", function (e) {
        e.preventDefault();
        const id = this.id.replace("-delete-input", "");
        const input = document.getElementById(`${id}-input-container`);
        input.remove();
    });
    deleteButton.appendChild(deleteIcon);

    inputId.appendChild(nameElement);
    inputId.appendChild(deleteButton);
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
        optionContainer.id = `${id}-option-container`;

        const optionId = document.createElement("div");
        optionId.classList.add(
            "p-2",
            "shrink",
            "flex",
            "flex-row",
            "gap-2",
            "items-center"
        );

        const nameElement = document.createElement("span");
        nameElement.innerHTML = "Option";

        const deleteButton = document.createElement("button");
        deleteButton.id = `${id}-delete-input`;
        const deleteIcon = setupSvgIcon(ICON_TRASH, 15, 15);
        deleteIcon.classList.add("fill-accent-light", "dark:fill-accent-dark");
        deleteButton.addEventListener("click", function (e) {
            e.preventDefault();
            const id = this.id.replace("-delete-input", "");
            const input = document.getElementById(`${id}-option-container`);
            input.remove();
        });
        deleteButton.appendChild(deleteIcon);

        optionId.appendChild(nameElement);
        optionId.appendChild(deleteButton);
        optionId.id = id;
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

    inputList.appendChild(inputContainer);
});

const addPresetModalOpen = document.getElementById(
    "modal-create-DidgYa-add-preset"
);
addPresetModalOpen.addEventListener("click", function (e) {
    e.preventDefault();
});

const addPresetButton = document.getElementById("add-preset-DidgYa");
addPresetButton.addEventListener("click", function (e) {
    e.preventDefault();

    const didgYaName = presetsDropdown.value;
    const didgYa = getDidgYaPreset(didgYaName);

    if (isLocalDidgYaWithDuplicateName(didgYaName))
        return makeToast("A DidgYa with that name already exists!", "error");

    addLocalDidgYaPreset(didgYa);

    const modal = document.getElementById("modal-add-preset-DidgYa");
    modal.classList.add("hidden");

    const modalCreate = document.getElementById("modal-create-DidgYa");
    modalCreate.classList.add("hidden");

    makeToast(
        `The DidgYa Preset "${didgYa.name}" has been added to your DidgYas!`,
        "success"
    );

    appendDidgYaToList(didgYa);
});

function setCustomSelectListeners() {
    // Select all dropdown buttons
    const customSelects = document.querySelectorAll('[aria-haspopup="true"]');
    customSelects.forEach((menuButton) => {
        const menu = menuButton.parentElement.nextElementSibling;
        menuButton.addEventListener("click", () => {
            const isExpanded =
                menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", !isExpanded);
            menu.classList.toggle("hidden", isExpanded);
        });
    });
    // Close all dropdowns when clicking outside
    document.addEventListener("click", (event) => {
        document
            .querySelectorAll('[aria-haspopup="true"]')
            .forEach((menuButton) => {
                const menu = menuButton.parentElement.nextElementSibling;
                if (
                    !menu.contains(event.target) &&
                    !menuButton.contains(event.target)
                ) {
                    menu.classList.add("hidden");
                    menuButton.setAttribute("aria-expanded", "false");
                }
            });
    });
    // Update button label when a menu item is selected
    document
        .querySelectorAll('[role="menu"] [role="menuitem"]')
        .forEach((menuItem) => {
            menuItem.addEventListener("click", function () {
                const menuButton = this.closest(".relative").querySelector(
                    '[aria-haspopup="true"]'
                );
                const label = menuButton.querySelector("label");
                // Assuming the menu item text is what you want to display on the button
                // const selectedText = this.textContent || this.innerText;
                const selectedText = this.innerHTML;
                // label.textContent = selectedText;
                label.innerHTML = selectedText;

                // Close the dropdown after selection
                const menu = menuButton.parentElement.nextElementSibling;
                menu.classList.add("hidden");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    // Prevent dropdown menus from closing when clicking inside them
    document.querySelectorAll('[role="menu"]').forEach((menu) => {
        menu.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });
    document.querySelectorAll(".custom-select").forEach((dropdown) => {
        const menuButton = dropdown.querySelector('[aria-haspopup="true"]');
        const menuItems = dropdown.querySelectorAll('[role="menuitem"]');
        let maxWidth = 0;

        // Create a temporary element to measure text width accurately
        const tempElement = document.createElement("span");
        tempElement.style.visibility = "hidden"; // Hide the element
        tempElement.style.position = "absolute"; // Avoid affecting layout
        tempElement.style.whiteSpace = "nowrap"; // Ensure text is in one line
        document.body.appendChild(tempElement);

        // Measure each menu item
        menuItems.forEach((item) => {
            tempElement.textContent = item.textContent || item.innerText;
            maxWidth = Math.max(maxWidth, tempElement.offsetWidth);
        });

        // Apply the widest width as min-width to the button, plus some padding
        menuButton.style.minWidth = `${maxWidth + 40}px`; // Adjust padding as needed

        // Clean up by removing the temporary element
        document.body.removeChild(tempElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Select all dropdown buttons
    const customSelects = document.querySelectorAll('[aria-haspopup="true"]');
    customSelects.forEach((menuButton) => {
        const menu = menuButton.parentElement.nextElementSibling;
        menuButton.addEventListener("click", () => {
            const isExpanded =
                menuButton.getAttribute("aria-expanded") === "true";
            menuButton.setAttribute("aria-expanded", !isExpanded);
            menu.classList.toggle("hidden", isExpanded);
        });
    });
    // Close all dropdowns when clicking outside
    document.addEventListener("click", (event) => {
        document
            .querySelectorAll('[aria-haspopup="true"]')
            .forEach((menuButton) => {
                const menu = menuButton.parentElement.nextElementSibling;
                if (
                    !menu.contains(event.target) &&
                    !menuButton.contains(event.target)
                ) {
                    menu.classList.add("hidden");
                    menuButton.setAttribute("aria-expanded", "false");
                }
            });
    });
    // Update button label when a menu item is selected
    document
        .querySelectorAll('[role="menu"] [role="menuitem"]')
        .forEach((menuItem) => {
            menuItem.addEventListener("click", function () {
                const menuButton = this.closest(".relative").querySelector(
                    '[aria-haspopup="true"]'
                );
                const label = menuButton.querySelector("label");
                // Assuming the menu item text is what you want to display on the button
                // const selectedText = this.textContent || this.innerText;
                const selectedText = this.innerHTML;
                // label.textContent = selectedText;
                label.innerHTML = selectedText;

                // Close the dropdown after selection
                const menu = menuButton.parentElement.nextElementSibling;
                menu.classList.add("hidden");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    // Prevent dropdown menus from closing when clicking inside them
    document.querySelectorAll('[role="menu"]').forEach((menu) => {
        menu.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });
    document.querySelectorAll(".custom-select").forEach((dropdown) => {
        const menuButton = dropdown.querySelector('[aria-haspopup="true"]');
        const menuItems = dropdown.querySelectorAll('[role="menuitem"]');
        let maxWidth = 0;

        // Create a temporary element to measure text width accurately
        const tempElement = document.createElement("span");
        tempElement.style.visibility = "hidden"; // Hide the element
        tempElement.style.position = "absolute"; // Avoid affecting layout
        tempElement.style.whiteSpace = "nowrap"; // Ensure text is in one line
        document.body.appendChild(tempElement);

        // Measure each menu item
        menuItems.forEach((item) => {
            tempElement.textContent = item.textContent || item.innerText;
            maxWidth = Math.max(maxWidth, tempElement.offsetWidth);
        });

        // Apply the widest width as min-width to the button, plus some padding
        menuButton.style.minWidth = `${maxWidth + 40}px`; // Adjust padding as needed

        // Clean up by removing the temporary element
        document.body.removeChild(tempElement);
    });
});
