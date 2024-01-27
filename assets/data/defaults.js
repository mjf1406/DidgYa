const DEFAULT_DIDGYAS = [
    {
        id: generateId(),
        emoji: '💦',
        name: 'Water',
        unit: 'ml',
        quantity: 250,
        inputs: null,
        timed: false,
        unitType: 'volume',
        records: [],
        active: null,
        location: 'local',
        timedInstances: null
    },
    {
        id: generateId(),
        emoji: '⚖️',
        name: 'Weight',
        unit: 'kg',
        quantity: false,
        inputs: [
            {
                name: 'kilogram',
                type: 'number',
            }
        ],
        timed: false,
        unitType: 'weight',
        records: [],
        active: null,
        location: 'local',
        timedInstances: null
    },
    {
        id: generateId(),
        emoji: '💩',
        name: 'Poop',
        unit: null,
        quantity: null,
        inputs: [
            {
                name: 'Bristol Stool Type',
                type: 'option',
                selects: [
                    {
                        type: 1,
                        description: 'separate hard lumps',
                        name: 'severe constipation'
                    },
                    {
                        type: 2,
                        description: 'lumpy and sausage like',
                        name: 'mild constipation'
                    },
                    {
                        type: 3,
                        description: 'a sausage shape with cracks in the surface',
                        name: 'normal'
                    },
                    {
                        type: 4,
                        description: 'like a smooth, soft sausage or snake',
                        name: 'normal'
                    },
                    {
                        type: 5,
                        description: 'soft blobs with clear-cut edges',
                        name: 'lacking fibre'
                    },
                    {
                        type: 6,
                        description: 'mushy consistency with ragged edges',
                        name: 'mild diarrhea'
                    },
                    {
                        type: 7,
                        description: 'liquid consistency with no solid pieces',
                        name: 'severe diarrhea'
                    },
                ]
            },
            {
                name: 'Color',
                type: 'option',
                selects: [
                    {
                        name: 'pale, light, or white',
                        hex: '#f7e2c9',
                        description: 'anti-diarrheal medication, lack of bile',
                    },
                    {
                        name: 'yellowish',
                        hex: '#b59c2b',
                        description: 'small intestine infection, excess fat',
                    },
                    {
                        name: 'brown',
                        hex: '#61352d',
                        description: 'healthy',
                    },
                    {
                        name: 'green',
                        hex: '#5a6133',
                        description: 'eating green dye, eating green vegetables, antibiotics, or bacterial infection',
                    },
                    {
                        name: 'bright red',
                        hex: '#e15b40',
                        description: 'bleeding lower digestive tract, hemorrhoids, red food coloring',
                    },
                    {
                        name: 'black or dark brown',
                        hex: '#241f21',
                        description: 'bleeding upper digestive tract, iron supplements, biusmuth subsalicylate',
                    },

                ]
            }
        ],
        unitType: 'litre',
        timed: false,
        records: [],
        active: null,
        location: 'local',
        timedInstances: null
    },
    {
        id: generateId(),
        emoji: '🛏️',
        name: 'Bed Time',
        unit: null,
        quantity: null,
        inputs: null,
        timed: true,
        unitType: null,
        records: [],
        active: false,
        location: 'local',
        timedInstances: []
    },
    {
        id: generateId(),
        emoji: '🪥',
        name: 'Brush Teeth',
        unit: null,
        quantity: null,
        inputs: null,
        timed: false,
        unitType: null,
        records: [],
        active: null,
        location: 'local',
        timedInstances: null
    }
]