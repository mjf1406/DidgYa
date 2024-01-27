function createLocalDidgYa(name, unit, quantity, inputs, timed, unitType, emoji, user) {
    const didgYas = JSON.parse(localStorage.getItem('didgYas'))
    didgYas.push({
        id: generateId(),
        created_at: new Date(),
        name: name, // text
        unit: unit, // text
        quantity: quantity, // integer
        inputs: inputs, // array of inputs
        timed: timed, // boolean
        unitType: unitType, // text
        emoji: emoji, // text
        records: [], // array of records
        active: false, // boolean
        timedInstances: [], // array of timed instances
        location: 'cloud', // text
        user_id: user.id, // text
    })
    localStorage.setItem('didgYas', JSON.stringify(didgYas))
}
function deleteLocalDidgYa(didgYas, didgYaIndex) {
    didgYas.splice(didgYaIndex, 1)
    localStorage.setItem('didgYas', JSON.stringify(didgYas))
}