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
                        hex: "#f7e2c9",
                    },
                    {
                        name: "yellowish",
                        hex: "#b59c2b",
                    },
                    {
                        name: "brown",
                        hex: "#61352d",
                    },
                    {
                        name: "green",
                        hex: "#5a6133",
                    },
                    {
                        name: "bright red",
                        hex: "#e15b40",
                    },
                    {
                        name: "black or dark brown",
                        hex: "#241f21",
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
