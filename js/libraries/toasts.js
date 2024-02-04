async function makeToast(content, type) {
    let color;
    if (type === "success") color = "#fff";
    else if (type === "warning") color = "#000";
    else if (type === "error") color = "#fff";

    let brightness;
    if (type === "success") brightness = 24;
    else if (type === "warning") brightness = 64;
    else if (type === "error") brightness = 42;

    let hsl;
    if (type === "success") hsl = `143deg 64%`;
    else if (type === "warning") hsl = `50deg 98%`;
    else if (type === "error") hsl = `0deg 74%`;

    let icon;
    if (type === "success")
        icon = `
            <svg class="w-[20px]" fill="white" id="icon-check" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>`;
    else if (type === "warning")
        icon = `
            <svg class="w-[3px]" fill="black" id="icon-exclamation" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V320c0 17.7 14.3 32 32 32s32-14.3 32-32V64zM32 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
            </svg>`;
    else if (type === "error")
        icon = `
            <svg class="w-[20px]" fill="white" id="icon-x-mark" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>`;

    Toastify({
        text: `<div class="flex flex-row gap-2 items-center justify-start"> 
            <span class="p-2 px-4 rounded-md w-fit h-fit" style="background-color: hsl(${hsl}${
            brightness * 0.7
        }% / 100%); z-index: 9999999">${icon}</span>
            <span>${content}</span></div>`,
        offset: {
            x: 10,
            y: 10,
        },
        gravity: "bottom",
        position: "left",
        style: {
            background: `hsl(${hsl}${brightness}% / 100%)`,
            color: color,
            zIndex: 1000,
            maxWidth: "28rem",
        },
        escapeMarkup: false,
    }).showToast();
}
