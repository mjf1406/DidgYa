const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
}
function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds % 60;
    minutes = minutes % 60;
    if (hours > 0)
        return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
            seconds
        )}`;
    else if (minutes > 0)
        return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
    else return `${padTo2Digits(seconds)}`;
}
function getClassesThatInclude(stringToSearch, elementId) {
    const elem = document.getElementById(elementId);
    return Array.from(elem.classList).filter((i) => i.includes(stringToSearch));
}
function removeClassesFromElement(classesToRemove, elementId) {
    const elem = document.getElementById(elementId);
    for (let index = 0; index < classesToRemove.length; index++) {
        const element = classesToRemove[index];
        elem.classList.remove(element);
    }
}
function getSelectedValueFromRadioGroup(radioGroupName) {
    try {
        return document.querySelector(`input[name="${radioGroupName}"]:checked`)
            .value;
    } catch (error) {
        console.log(
            "🚀 ~ file: global.js:545 ~ getSelectedValueFromRadioGroup ~ radioGroupName:",
            radioGroupName
        );
        console.error(
            "🚀 ~ file: global.js:547 ~ getSelectedValueFromRadioGroup ~ error:",
            error
        );
    }
}
function generateId() {
    // Function to generate a random ID
    // Source: https://stackoverflow.com/a/44622300
    return Array.from(Array(32), () =>
        // The length of the generated id is 32 characters
        Math.floor(Math.random() * 36).toString(36)
    ).join("");
}
function generateRandomIntegerBetween(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

// Function to format milliseconds into 0h 0m 0s
function formatMillisecondsToReadable(milliseconds, displayMilliseconds) {
    const hours = Math.floor(milliseconds / 3600000); // 1 Hour = 3600000 milliseconds
    const minutes = Math.floor((milliseconds % 3600000) / 60000); // 1 Minute = 60000 milliseconds
    const seconds = Math.floor((milliseconds % 60000) / 1000); // 1 Second = 1000 milliseconds
    const ms = milliseconds % 1000; // Remainder milliseconds after removing hours, minutes and seconds
    let timeString = "";
    if (hours > 0) timeString += `${hours}h `;
    if (minutes > 0) timeString += `${minutes}m `;
    if (seconds > 0) timeString += `${seconds}s `;
    if (ms > 0 && displayMilliseconds) timeString += `${ms}ms`;
    return timeString.trim(); // Removes any extra space at the end
}
// Function to load a local JSON from data/JSONs/
async function fetchLocalJson(JSON) {
    const response = await fetch(`${JSON}.json`);
    const data = await response.json();
    return data;
}
async function fetchInlineSvg(svgPath) {
    try {
        const response = await fetch(svgPath);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const svgText = await response.text();
        return svgText;
    } catch (error) {
        console.error("Error fetching the SVG:", error);
        return null; // or you can throw the error again if you prefer
    }
}

function setupSvgIcon(svg, width, height) {
    height = height ? height : width;
    const icon = svg.cloneNode(true);
    icon.classList.remove("hidden");
    icon.setAttribute("width", width);
    icon.setAttribute("height", height);
    return icon;
}

function createCustomDropdown(selectName, options, index) {
    const select = document.createElement("div");
    select.classList.add(
        "custom-select",
        "relative",
        "inline-block",
        "text-left",
        "w-full"
    );
    select.id = `input-${index}-${selectName}`;

    const firstChild = document.createElement("div");
    const button = document.createElement("button");
    const label = document.createElement("label");
    const caretIcon = setupSvgIcon(ICON_CARET, 0);

    button.classList.add(
        "inline-flex",
        "w-full",
        "justify-center",
        "gap-x-1.5",
        "rounded-md",
        "bg-neutral-light",
        "dark:bg-highlight-dark/10",
        "px-3",
        "py-2",
        "text-sm",
        "font-semibold",
        "text-text-light",
        "dark:text-text-dark",
        "shadow-sm",
        // "ring-1",
        // "ring-inset",
        // "ring-gray-300",
        "hover:bg-highlight-light/50",
        "hover:dark:bg-highlight-dark/30"
    );
    button.id = "menu-button";
    button.ariaExpanded = "false";
    button.setAttribute("aria-haspopup", "true");
    button.type = "button";

    label.classList.add("grow", "flex", "flex-row", "gap-2", "items-center");
    label.innerText = `Select a ${selectName.toTitleCase()}...`;

    caretIcon.classList.add("self-end", "w-5", "h-5", "-mr-1", "text-gray-400");

    button.appendChild(label);
    button.appendChild(caretIcon);
    firstChild.appendChild(button);

    const secondChild = document.createElement("div");
    const menuItemContainer = document.createElement("div");

    secondChild.classList.add(
        "absolute",
        "right-0",
        "z-10",
        "hidden",
        "w-full",
        "mt-2",
        "origin-top-right",
        "bg-neutral-light",
        "dark:bg-neutral-dark",
        "rounded-md",
        "shadow-lg",
        "ring-1",
        "ring-highlight-light",
        "dark:ring-highlight-dark/10",
        "focus:outline-none"
    );
    secondChild.role = "menu";
    secondChild.ariaOrientation = "vertical";
    secondChild.ariaLabelledby = "menu-button";
    secondChild.tabIndex = "-1";

    menuItemContainer.classList.add("py-1");
    menuItemContainer.role = "none";

    for (let index = 0; index < options.length; index++) {
        const element = options[index];
        const name = element.name;
        const icon = element.icon;

        const a = document.createElement("a");
        a.classList.add(
            "block",
            "px-4",
            "py-2",
            "text-sm",
            "bg-neutral-light",
            "dark:bg-highlight-dark/10",
            "hover:bg-highlight-light/90",
            "hover:dark:bg-highlight-dark/20",
            "flex",
            "flex-row",
            "gap-2",
            "justify-start",
            "items-center",
            "text-text-light",
            "dark:text-text-dark"
        );
        a.role = "menuitem";
        a.tabIndex = "-1";
        a.id = `menu-item-${index}`;

        const textSpan = document.createElement("span");
        textSpan.innerText = name.toTitleCase();

        const iconSpan = document.createElement("span");
        let svg;
        if (icon) {
            svg = setupSvgIcon(eval(icon.name), icon.width, icon.height);
            svg.setAttribute("fill", icon.color);
            iconSpan.appendChild(svg);
        }

        a.appendChild(iconSpan);
        a.appendChild(textSpan);

        menuItemContainer.appendChild(a);
    }

    secondChild.appendChild(menuItemContainer);

    select.appendChild(firstChild);
    select.appendChild(secondChild);

    return select;
}
function getUserLanguage() {
    return navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
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

Node.prototype.replaceInPlace = function () {
    const clone = this.cloneNode(true);
    this.parentNode.replaceChild(clone, this);
    return clone;
};

Array.prototype.random = function () {
    if (this.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * this.length);
    return this[randomIndex];
};
Array.prototype.last = function () {
    return this[this.length - 1];
};
Array.prototype.alphabetizeByKey = function (key) {
    return this.sort((a, b) => {
        // Determine values to compare
        const valA =
            key && a[key]
                ? String(a[key]).toUpperCase()
                : String(a).toUpperCase();
        const valB =
            key && b[key]
                ? String(b[key]).toUpperCase()
                : String(b).toUpperCase();

        // Perform comparison
        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
    });
};
Array.prototype.alphabetize = function () {
    return this.sort((a, b) => {
        // Convert to string and compare alphabetically
        const strA = String(a).toUpperCase(); // Ignore case
        const strB = String(b).toUpperCase(); // Ignore case
        if (strA < strB) return -1;
        if (strA > strB) return 1;
        return 0;
    });
};
Array.prototype.mean = function (key) {
    let values = [];

    if (key !== undefined) {
        // Extract values by key, excluding non-numeric and NaN values
        values = this.map((obj) => obj[key]).filter(
            (val) => typeof val === "number" && !isNaN(val)
        );
    } else {
        // Filter out non-numeric and NaN values
        values = this.filter((val) => typeof val === "number" && !isNaN(val));
    }

    if (values.length === 0) return NaN; // Return NaN if no valid numbers are present

    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
};

Audio.prototype.stop = function () {
    this.pause();
    this.currentTime = 0;
};

String.prototype.toTitleCase = function () {
    // Define a list of words not to be capitalized
    const doNotCapitalize = [
        "a",
        "an",
        "the",
        "for",
        "and",
        "nor",
        "but",
        "or",
        "yet",
        "so",
        "at",
        "around",
        "by",
        "after",
        "along",
        "for",
        "from",
        "of",
        "on",
        "to",
        "with",
        "without",
    ];
    // Split the string by spaces
    return this.replace(/\w\S*/g, function (txt) {
        if (doNotCapitalize.includes(txt)) {
            return txt;
        } else {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    });
};
String.prototype.reverse = function () {
    return this.split("").reverse().join("");
};

function isInLastSixDays(dateObject) {
    const now = new Date();
    const sevenDaysAgo = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 6
    );
    return dateObject >= sevenDaysAgo && dateObject < now;
}
function computeLastDaysDatesOfN(n, today) {
    const dates = [];
    for (let index = 0; index < n; index++) {
        const newDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - index
        );
        dates.push(newDate);
    }
    return dates;
}
function isInCurrentWeek(weekStart, dateObject) {
    const now = new Date();
    const firstDayOfWeek = now.getDate() - now.getDay() - 1;
    const lastDayOfWeek = firstDayOfWeek + 7;
    const firstDay = new Date(now.setDate(firstDayOfWeek));
    const lastDay = new Date(now.setDate(lastDayOfWeek));
    return dateObject >= firstDay && dateObject <= lastDay;
}
