async function createCloudDidgYa(name, unit, quantity, inputs, timed, unitType, emoji, user) {
    const { error } = await _supabase
        .from('didgyas')
        .insert([
            {
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
            }
        ])
    
    if (error) {
        console.error('DidgYa -- Copy this line', error)
        return error
    }
}
async function deleteCloudDidgYa(didgYaId) {
    const { error } = await _supabase
        .from('didgyas')
        .delete()
        .eq('id', didgYaId)

    if (error) {
        console.error('DidgYa -- Copy this line', error)
        return error
    }
}