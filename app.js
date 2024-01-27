async function createDidgYa(name, unit, quantity, inputs, timed, unitType, emoji, user) {
    if (quantity == "" || quantity == 0 || quantity == null) {
        unit = null
        unitType = null
        quantity = null
    }

    if (!user) user = {id: 'anon'}

    // const createToCloud = await createCloudDidgYa(name, unit, quantity, inputs, timed, unitType, emoji, user)
    // if (createToCloud) return makeToast(`An error occurred while creating the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    const createToLocal = createLocalDidgYa(name, unit, quantity, inputs, timed, unitType, emoji, user)
    if (createToLocal === 'error') return 'error'
    makeToast(`The <b>${name}</b> DidgYa was created successfully!`,'success')
}
async function deleteDidgYa(didgYaId) {
    const name = getLocalDidgYaName(didgYaId)
    
    // const deleteFromCloud = await deleteCloudDidgYa(didgYaId)
    // if (deleteFromCloud) return makeToast(`An error occurred while deleting the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    
    deleteLocalDidgYa(didgYaId)
    makeToast(`The <b>${name}</b> DidgYa was deleted successfully!`,'success')
}
function clickDidgYa(didgYaId) {
    const name = getLocalDidgYaName(didgYaId)
    const now = new Date()



    // const startInCloud = await startCloudDidgya(didgYaId, now)
    // if (startInCloud) return makeToast(`An error occurred while deleting the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    
    const error = startLocalDidgYa(didgYaId, now)
    if (error) makeToast(`An error occurred while starting the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
}
function stopDidgYa(didgYaId) {
    const name = getLocalDidgYaName(didgYaId)
    const endTime = new Date()
    const startTime = getLocalStartTime(didgYaId)
    const duration = endTime - startTime

    const instance = {
        startTime: startTime,
        endTime: endTime,
    }

    // const stopInCloud = await stopCloudDidgya(didgYaId, instance)
    // if (stopInCloud) return makeToast(`An error occurred while deleting the <b>${name}</b> DidgYa. Please try again in a moment.`, 'error')
    stopLocalDidgYa(didgYaId, instance)
    makeToast(`You <b>${name}</b>'d for <i>${formatMillisecondsToReadable(duration, false)}</i>`,'success')
}
function editDidgYa(didgYaId) {
    const now = new Date()
    const didgYas = JSON.parse(localStorage.getItem('didgYas'))
    const didgYaIndex = didgYas.findIndex(element => element.id == didgYaId)

    const didgYaData = didgYas[didgYaIndex]

    makeToast(`Editing <b>${didgYas[didgYaIndex].name}</b>!`,'success')
}
function viewDidgYa(didgYaId) {
    const now = new Date()
    const didgYas = JSON.parse(localStorage.getItem('didgYas'))
    const didgYaIndex = didgYas.findIndex(element => element.id == didgYaId)

    const didgYa = didgYas[didgYaIndex]

    const nameElements = document.getElementsByName('viewing-DidgYa')
    nameElements.forEach(element => {
        element.innerHTML = `${didgYa.emoji} <b>${didgYa.name}</b>`
    });

    const viewModal = document.getElementById('modal-view-DidgYa')
    viewModal.classList.remove('hidden')

    const deleteButton = document.getElementById('button-delete-view-DidgYa')
    deleteButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-delete-DidgYa')
        modal.classList.remove('hidden')

        const toBeDeletedNameElements = document.getElementsByName('DidgYa-to-delete-name')
        toBeDeletedNameElements.forEach(element => {
            element.innerHTML = `the ${didgYa.emoji} <b>${didgYa.name}</b> DidgYa`
        });

        const buttonDeleteDidgYa = document.getElementById('button-delete-DidgYa')
        buttonDeleteDidgYa.addEventListener('click', function(e){
            e.preventDefault()

            deleteDidgYa(didgYaId)
            const didgYas = getAllLocalDidgYas()
            populateDidgYaList(didgYas)
            modal.classList.add('hidden')
            viewModal.classList.add('hidden')
        })
    })

    const editButton = document.getElementById('button-edit-view-DidgYa')
    editButton.addEventListener('click', (e) => {
        e.preventDefault()
        editDidgYa(didgYaId)
    })
}

function populateDidgYaList(didgYas) {
    const now = new Date()

    const didgYaList = document.getElementById('DidgYa-list')
    didgYaList.innerHTML = ''

    if (didgYas.length == 0) return didgYaList.innerHTML = `
        <div class="list-group-item rounded-xl p-2 bg-cyan-950 text-center text-3xl m-4">
            Click the <i class="fas fa-plus"></i> button to create a DidgYa!
        </div>`

    for (let i = 0; i < didgYas.length; i++) {
        const didgYa = didgYas[i]
        const didgYaListItem = document.createElement('div')
        didgYaListItem.classList.add('flex','flex-row','gap-4','pl-3','pr-1','py-0.5','bg-cyan-950','items-center','justify-between','text-3xl','flex-no-wrap','max-w-md','w-full')

        const emoji = document.createElement('div')
        emoji.classList.add('text-2xl','cursor-pointer')
        emoji.id = `emoji-${didgYa.id}`
        if (didgYa.emoji) emoji.innerHTML = didgYa.emoji
        else { 
            emoji.innerHTML = '🤷'
            emoji.classList.add('opacity-0')
        }
        didgYaListItem.appendChild(emoji)

        const text = document.createElement('div')
        text.classList.add('grow','shrink-0','text-left','justify-start','mr-auto','flex','flex-col','gap-px','items-left','cursor-pointer')

        // Name and Quantity + Unit
        const nameQuantity = document.createElement('div')
        nameQuantity.classList.add('flex','flex-row','gap-1','items-center','justify-start') 

        if (didgYa.name) {
            const name = document.createElement('span')
            name.classList.add('text-base')
            name.id = `name-${didgYa.id}`
            name.innerHTML = didgYa.name
            nameQuantity.appendChild(name)
        }
        if (didgYa.quantity > 0) {
            const quantity = document.createElement('span')
            quantity.classList.add('text-2xs')
            quantity.id = `quantity-${didgYa.id}`
            quantity.innerHTML = `(${didgYa.quantity} ${didgYa.unit})`
            nameQuantity.appendChild(quantity)
        }
        if (didgYa.active === true) {
            const active = document.createElement('span')
            active.classList.add('text-xs')
            active.id = `active-${didgYa.id}`
            const startTime = new Date(didgYa.records.last())
            const now = new Date()
            let elapsedTime = now - startTime
            active.innerHTML = `(${formatMillisecondsToReadable(elapsedTime, false)})`
            setInterval(() => {
                elapsedTime += 1000
                active.innerHTML = `(${formatMillisecondsToReadable(elapsedTime, false)})`
            }, 1000)
            nameQuantity.appendChild(active)
        }
        text.appendChild(nameQuantity)

        let todaysRecords = didgYa.records
        todaysRecords = todaysRecords.filter(record => {
            const recordDate = (record.isString()) ? new Date(record) : new Date(record.dt);
            return recordDate.getDate() === now.getDate() &&
                    recordDate.getMonth() === now.getMonth() &&
                    recordDate.getFullYear() === now.getFullYear();
        });

        const performedToday = document.createElement('div')
        performedToday.classList.add('text-xs')
        performedToday.id = `performedToday-${didgYa.id}`
        const timeString = (todaysRecords.length == 1)? 'time' : 'times'
        performedToday.innerHTML = `<b>${todaysRecords.length}</b> ${timeString} today`
        text.appendChild(performedToday)


        didgYaListItem.appendChild(text)

        const buttons = document.createElement('div')
        buttons.classList.add('flex','flex-row','gap-2','text-3xl','items-center')

        const stop = document.createElement('span')
        stop.classList.add('text-blue-400','cursor-pointer')
        stop.id = `stop-${didgYa.id}`
        stop.innerHTML = '<i class="fa-solid fa-stop"></i>'
        stop.classList.add('hidden')
        if (didgYa.timed === true && didgYa.active === true) stop.classList.remove('hidden')
        buttons.appendChild(stop)

        const play = document.createElement('span')
        play.classList.add('text-green-400','cursor-pointer')
        play.innerHTML = '<i class="fa-solid fa-play"></i>'
        play.id = `play-${didgYa.id}`
        if (didgYa.active === true) play.classList.add('hidden')
        buttons.appendChild(play)

        // const viewIcon = document.createElement('span')
        // viewIcon.classList.add('cursor-pointer','text-lg')
        // viewIcon.innerHTML = '<i class="fa-solid fa-eye"></i>'
        // viewIcon.id = `view-${didgYa.id}`
        // buttons.appendChild(viewIcon)

        // const editIcon = document.createElement('span')
        // editIcon.classList.add('cursor-pointer','text-lg')
        // editIcon.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
        // editIcon.id = `edit-${didgYa.id}`
        // buttons.appendChild(editIcon)

        // const deleteIcon = document.createElement('span')
        // deleteIcon.classList.add('text-red-500','cursor-pointer','text-lg')
        // deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>'
        // deleteIcon.id = `delete-${didgYa.id}`
        // buttons.appendChild(deleteIcon)

        didgYaListItem.appendChild(buttons)

        const location = document.createElement('div')
        location.classList.add('text-xs','self-start','justify-start')
        location.name = 'DidgYa-location'
        location.id = `location-${didgYa.id}`
        if (didgYa.location === 'local') {
            fetchInlineSvg('assets/img/icons/cloud-solid-x.svg')
                .then(svgString => {
                    location.innerHTML = svgString
                    location.style.width = '15px'
                    location.classList.add('fill-orange-300')
                })
        } 
        if (didgYa.location === 'cloud') {
            location.classList.add('text-blue-400')
            location.innerHTML = `<i class="fa-solid fa-cloud"></i>`
        } 
        didgYaListItem.appendChild(location)

        didgYaList.appendChild(didgYaListItem)




        // --- Listeners ---

        emoji.addEventListener('click', function(){
            viewDidgYa(didgYa.id)
        })
        text.addEventListener('click', function(){
            viewDidgYa(didgYa.id)
        })

        const buttonStop = document.getElementById(`stop-${didgYa.id}`)
        buttonStop.addEventListener('click', function(){
            console.log(`Stopped ${didgYa.name} : ${didgYa.id}`)
            stopDidgYa(didgYa.id)
            const didgYas = getAllLocalDidgYas()
            populateDidgYaList(didgYas)
        })

        const buttonPlay = document.getElementById(`play-${didgYa.id}`)
        buttonPlay.addEventListener('click', function(){
            console.log(`Clicked ${didgYa.name} : ${didgYa.id}`)
            clickDidgYa(didgYa.id)
            const didgYas = getAllLocalDidgYas()
            populateDidgYaList(didgYas)
        })

        // const view = document.getElementById(`view-${didgYa.id}`)
        // view.addEventListener('click', function(){
        //     console.log(`Viewing ${didgYa.name} : ${didgYa.id}`)
        //     viewDidgYa(didgYa.id)
        // })

        // const edit = document.getElementById(`edit-${didgYa.id}`)
        // edit.addEventListener('click', function(){
        //     console.log(`Editing ${didgYa.name} : ${didgYa.id}`)
        //     editDidgYa(didgYa.id)
        //     const didgYas = getAllLocalDidgYas()
        //     populateDidgYaList(didgYas)
        // })

        // const deleteButton = document.getElementById(`delete-${didgYa.id}`)
        // deleteButton.addEventListener('click', function(){
        //     const modal = document.getElementById('modal-delete-DidgYa')
        //     modal.classList.remove('hidden')

        //     const toBeDeletedNameElements = document.getElementsByName('DidgYa-to-delete-name')
        //     toBeDeletedNameElements.forEach(element => {
        //         element.innerHTML = `the <b>${didgYa.name}</b> DidgYa`
        //     });

        //     const buttonDeleteDidgYa = document.getElementById('button-delete-DidgYa')
        //     buttonDeleteDidgYa.addEventListener('click', function(e){
        //         e.preventDefault()

        //         deleteDidgYa(didgYa.id)
        //         const didgYas = getAllLocalDidgYas()
        //         populateDidgYaList(didgYas)
        //         modal.classList.add('hidden')
        //     })
        // })

        const locationMessage = (didgYa.location === 'local')? `The <b>${didgYa.name}</b> DidgYa is stored <i><b>locally</b></i> and is only accessible through this browser` : `The <b>${didgYa.name}</b> DidgYa is stored in the <i><b>cloud</b></i>`
        tippy(location, {
            content: locationMessage,
            allowHTML: true,
        })
    }
}


function setUpStartModal(didgYaData, divToPopulate){
    divToPopulate.innerHTML = ''
    const startDidgYaModal = document.getElementById('modal-start-DidgYa')
    const inputs = didgYaData.inputs

    if (inputs.length > 0) {
        startDidgYaModal.classList.remove('hidden')

        const nameElements = document.getElementsByName('starting-DidgYa')
        nameElements.forEach(element => {
            element.innerHTML = `${didgYaData.emoji} <b>${didgYaData.name}</b>`
        });

        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];
            const name = element.name
            const type = element.type
            const selects = element.selects ? element.selects : null
            const input = createInput(type, name, selects, index)
            divToPopulate.appendChild(input)
        }
    }
}
function createInput(inputType, name, selects, index){
    const div = document.createElement('div')
    div.classList.add('mb-5')

    const label = document.createElement('label')
    label.classList.add('block','mb-2','text-sm','font-medium','text-gray-900','dark:text-white')
    label.innerHTML = name.toTitleCase()
    label.setAttribute('for',`input-${name}`)

    const input = (inputType === 'select') ? document.createElement(inputType) : document.createElement('input')
    input.id = `input-${index}-${name}`

    if (inputType === 'select') {
        input.classList.add('"bg-gray-50','border','border-gray-300','text-gray-900','text-sm','rounded-lg','focus:ring-blue-500','focus:border-blue-500','block','w-full','p-2.5','dark:bg-gray-700','dark:border-gray-600','dark:placeholder-gray-400','dark:text-white','dark:focus:ring-blue-500','dark:focus:border-blue-500')
       selects.forEach(element => {
            const option = document.createElement('option')
            const description = element.description ? `- ${element.description}` : ''
            option.value = element.value
            option.innerHTML = `<span class="shadow-md shadow-black">${element.value}</span> ${description}`

            const hex = element.hex ? element.hex : false
            if (hex) {
                option.style.backgroundColor = hex
            }
            input.append(option)
        });
    }

    if (inputType === 'number') {
        input.classList.add('bg-gray-50','border','border-gray-300','text-gray-900','text-sm','rounded-lg','focus:ring-blue-500','focus:border-blue-500','block','w-full','p-2.5','dark:bg-gray-700','dark:border-gray-600','dark:placeholder-gray-400','dark:text-white','dark:focus:ring-blue-500','dark:focus:border-blue-500')
        input.type = 'number'
        input.min = 0
        input.max = 1000
        input.step = 1
        input.placeholder = `Input ${name}...`
    }

    div.appendChild(label)
    div.appendChild(input)
    return div
}