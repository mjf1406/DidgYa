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
                type: 'select',
                selects: [
                    {
                        value: 'Select stool type...'
                    },
                    {
                        value: 1,
                        description: 'separate hard lumps',
                        name: 'severe constipation'
                    },
                    {
                        value: 2,
                        description: 'lumpy and sausage like',
                        name: 'mild constipation'
                    },
                    {
                        value: 3,
                        description: 'a sausage shape with cracks in the surface',
                        name: 'normal'
                    },
                    {
                        value: 4,
                        description: 'like a smooth, soft sausage or snake',
                        name: 'normal'
                    },
                    {
                        value: 5,
                        description: 'soft blobs with clear-cut edges',
                        name: 'lacking fibre'
                    },
                    {
                        value: 6,
                        description: 'mushy consistency with ragged edges',
                        name: 'mild diarrhea'
                    },
                    {
                        value: 7,
                        description: 'liquid consistency with no solid pieces',
                        name: 'severe diarrhea'
                    },
                ]
            },
            {
                name: 'Color',
                type: 'select',
                selects: [
                    {
                        value: 'Select stool color...',
                    },
                    {
                        value: 'pale, light, or white',
                        hex: '#f7e2c9',
                    },
                    {
                        value: 'yellowish',
                        hex: '#b59c2b',
                    },
                    {
                        value: 'brown',
                        hex: '#61352d',
                    },
                    {
                        value: 'green',
                        hex: '#5a6133',
                    },
                    {
                        value: 'bright red',
                        hex: '#e15b40',
                    },
                    {
                        value: 'black or dark brown',
                        hex: '#241f21',
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