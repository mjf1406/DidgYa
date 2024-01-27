async function getAllCloudDidgYasByUserId(userId) {
    const { data, error } = await _supabase
        .from('didgyas')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    if (error) {
        console.log('error fetching data from supabase', error)
        return null
    }
    return data
}
async function isCloudDidgYaWithDuplicateNameByUserId(name, userId) {
    const { data, error } = await _supabase
        .from('didgyas')
        .select('*')
        .eq('user_id', userId)
        .eq('name', name)
    if (error) {
        console.log('error fetching data from supabase', error)
        return null
    }
    return data.length > 0 ? true : false
}




// --- Insert and Update ---

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
async function startCloudDidgya(didgYaId, now){
    const { data, error } = await _supabase
        .from('didgyas')
        .update({
            active: true,
            records: {
                append: [ now ]
            }
        })
        .eq('id', didgYaId)

    if (error) {
        console.error('DidgYa -- Copy this line', error)
        return error
    }
}
async function stopCloudDidgya(didgYaId, instance){
    const { data, error } = await _supabase
        .from('didgyas')
        .update({
            active: false,
            timedInstances: {
                append: [ instance ]
            }
        })
        .eq('id', didgYaId)

    if (error) {
        console.error('DidgYa -- Copy this line', error)
        return error
    }
}