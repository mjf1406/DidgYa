const ICON_CIRCLE_FILLED = document.getElementById("icon-circle-filled");
const ICON_SQUARE_FILLED = document.getElementById("icon-square-filled");
const ICON_I = document.getElementById("icon-i");

const DEFAULT_DIDGYAS = [
    {
        id: generateId(),
        emoji: "💦",
        name: "Water",
        unit: "ml",
        quantity: 250,
        inputs: null,
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 15,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "⚖️",
        name: "Weight",
        unit: "kg",
        quantity: false,
        inputs: [
            {
                name: "kilogram",
                type: "number",
            },
        ],
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 1,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "💩",
        name: "Poop",
        unit: null,
        quantity: null,
        inputs: [
            {
                name: "Bristol Stool Type",
                type: "select",
                options: [
                    {
                        name: "Select stool type...",
                    },
                    {
                        name: "1 -separate hard lumps",
                    },
                    {
                        name: "2 - lumpy and sausage like",
                    },
                    {
                        name: "3 - a sausage shape with cracks in the surface",
                    },
                    {
                        name: "4 - like a smooth, soft sausage or snake",
                    },
                    {
                        name: "5 - soft blobs with clear-cut edges",
                    },
                    {
                        name: "6 - mushy consistency with ragged edges",
                    },
                    {
                        name: "7 - liquid consistency with no solid pieces",
                    },
                ],
            },
            {
                name: "Color",
                type: "select",
                options: [
                    {
                        name: "Select stool color...",
                    },
                    {
                        name: "pale, light, or white",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#f7e2c9",
                        },
                    },
                    {
                        name: "yellowish",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#b59c2b",
                        },
                    },
                    {
                        name: "brown",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#61352d",
                        },
                    },
                    {
                        name: "green",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#5a6133",
                        },
                    },
                    {
                        name: "bright red",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#e15b40",
                        },
                    },
                    {
                        name: "black or dark brown",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#241f21",
                        },
                    },
                ],
            },
            {
                name: "Wipes",
                type: "number",
            },
            {
                name: "Stool Quantity",
                type: "number",
            },
            {
                name: "Stool Shape",
                type: "select",
                options: [
                    {
                        name: "Select stool shape...",
                    },
                    {
                        name: "sausage",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15, // Pixels
                            height: 15, // Pixels
                        },
                    },
                    {
                        name: "i-beam",
                        icon: {
                            name: "ICON_I",
                            width: 15, // Pixels
                            height: 15, // Pixels
                        },
                    },
                    {
                        name: "thin bar",
                        icon: {
                            name: "ICON_SQUARE_FILLED",
                            width: 15, // Pixels
                            height: 7, // Pixels
                        },
                    },
                    {
                        name: "thin sausage",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 8, // Pixels
                            height: 8, // Pixels
                        },
                    },
                    {
                        name: "rectangular prism",
                        icon: {
                            name: "ICON_SQUARE_FILLED",
                            width: 15, // Pixels
                            height: 15, // Pixels
                        },
                    },
                ],
            },
        ],
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: null,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "🛏️",
        name: "Bed Time",
        unit: null,
        quantity: null,
        inputs: null,
        timed: true,
        records: [],
        active: false,
        location: "local",
        dailyGoal: null,
        timedInstances: [],
    },
    {
        id: generateId(),
        emoji: "🪥",
        name: "Brush Teeth",
        unit: null,
        quantity: null,
        inputs: null,
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 2,
        timedInstances: null,
    },
];
const PRESET_DIDGYAS = [
    {
        id: generateId(),
        emoji: "💦",
        name: "Water",
        unit: "ml",
        quantity: 250,
        inputs: null,
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 15,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "⚖️",
        name: "Weight",
        unit: "kg",
        quantity: false,
        inputs: [
            {
                name: "kilogram",
                type: "number",
            },
        ],
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 1,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "💩",
        name: "Poop",
        unit: null,
        quantity: null,
        inputs: [
            {
                name: "Bristol Stool Type",
                type: "select",
                options: [
                    {
                        name: "Select stool type...",
                    },
                    {
                        name: "1 -separate hard lumps",
                    },
                    {
                        name: "2 - lumpy and sausage like",
                    },
                    {
                        name: "3 - a sausage shape with cracks in the surface",
                    },
                    {
                        name: "4 - like a smooth, soft sausage or snake",
                    },
                    {
                        name: "5 - soft blobs with clear-cut edges",
                    },
                    {
                        name: "6 - mushy consistency with ragged edges",
                    },
                    {
                        name: "7 - liquid consistency with no solid pieces",
                    },
                ],
            },
            {
                name: "Color",
                type: "select",
                options: [
                    {
                        name: "Select stool color...",
                    },
                    {
                        name: "pale, light, or white",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#f7e2c9",
                        },
                    },
                    {
                        name: "yellowish",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#b59c2b",
                        },
                    },
                    {
                        name: "brown",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#61352d",
                        },
                    },
                    {
                        name: "green",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#5a6133",
                        },
                    },
                    {
                        name: "bright red",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#e15b40",
                        },
                    },
                    {
                        name: "black or dark brown",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#241f21",
                        },
                    },
                ],
            },
            {
                name: "Wipes",
                type: "number",
            },
            {
                name: "Stool Quantity",
                type: "number",
            },
            {
                name: "Stool Shape",
                type: "select",
                options: [
                    {
                        name: "Select stool shape...",
                    },
                    {
                        name: "sausage",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15, // Pixels
                            height: 15, // Pixels
                        },
                    },
                    {
                        name: "i-beam",
                        icon: {
                            name: "ICON_I",
                            width: 15, // Pixels
                            height: 15, // Pixels
                        },
                    },
                    {
                        name: "thin bar",
                        icon: {
                            name: "ICON_SQUARE_FILLED",
                            width: 15, // Pixels
                            height: 7, // Pixels
                        },
                    },
                    {
                        name: "thin sausage",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 8, // Pixels
                            height: 8, // Pixels
                        },
                    },
                    {
                        name: "rectangular prism",
                        icon: {
                            name: "ICON_SQUARE_FILLED",
                            width: 15, // Pixels
                            height: 15, // Pixels
                        },
                    },
                ],
            },
        ],
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: null,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "🚽",
        name: "Pee",
        unit: null,
        quantity: null,
        inputs: [
            {
                name: "Color",
                type: "select",
                options: [
                    {
                        name: "Select urine color...",
                    },
                    {
                        name: "over-hydrated",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#fcffe2",
                        },
                    },
                    {
                        name: "good hydration",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#fcf4a9",
                        },
                    },
                    {
                        name: "fair hydration",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#fce971",
                        },
                    },
                    {
                        name: "slight dehydration",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#f9d401",
                        },
                    },
                    {
                        name: "moderate dehydration",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#e99f01",
                        },
                    },
                    {
                        name: "high dehydration",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#de6f04",
                        },
                    },
                    {
                        name: "severe dehydration",
                        icon: {
                            name: "ICON_CIRCLE_FILLED",
                            width: 15,
                            height: 15,
                            color: "#d23c07",
                        },
                    },
                ],
            },
        ],
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: null,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "🛏️",
        name: "Bed Time",
        unit: null,
        quantity: null,
        inputs: null,
        timed: true,
        records: [],
        active: false,
        location: "local",
        dailyGoal: null,
        timedInstances: [],
    },
    {
        id: generateId(),
        emoji: "🪥",
        name: "Brush Teeth",
        unit: null,
        quantity: null,
        inputs: null,
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 2,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "🧵",
        name: "Floss",
        unit: null,
        quantity: null,
        inputs: null,
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 1,
        timedInstances: null,
    },
    {
        id: generateId(),
        emoji: "🚰",
        name: "Mouthwash",
        unit: null,
        quantity: null,
        inputs: null,
        timed: false,
        records: [],
        active: null,
        location: "local",
        dailyGoal: 2,
        timedInstances: null,
    },
];
