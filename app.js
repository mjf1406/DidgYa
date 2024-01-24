function saveDidgYa(name, unit, amount, unitType) {
    if (amount == "" || amount == 0 || amount == null) {
        unit = null
        unitType = null
    }
    const data = {
        id: generateId(),
        name: name,
        unit: unit,
        amount: amount,
        unitType: unitType,
        records: [], // Array of Date() objects
    }

    const didgYas = JSON.parse(localStorage.getItem('didgYas'))
    didgYas.push(data)
    localStorage.setItem('didgYas', JSON.stringify(didgYas))

    makeToast(`The <b>${name}</b> DidgYa was created successfully!`,'success')
}
function clickDidgYa(didgYaId) {
    const now = new Date()
    const didgYas = JSON.parse(localStorage.getItem('didgYas'))
    const didgYaIndex = didgYas.findIndex(element => element.id == didgYaId)
    didgYas[didgYaIndex].records.push(now)
    localStorage.setItem('didgYas', JSON.stringify(didgYas))

    makeToast(`You DidgYa'd <b>${didgYas[didgYaIndex].name}</b>!`,'success')
}
function getDidgYas() {
    const didgYas = JSON.parse(localStorage.getItem('didgYas'))
    if (didgYas == null) {
        return []
    }
    return didgYas
}
function populateDidgYaList(didgYas) {
    const didgYaList = document.getElementById('DidgYa-list')
    didgYaList.innerHTML = ''

    if (didgYas.length == 0) didgYaList.innerHTML = `
        <div class="list-group-item rounded-xl p-2 bg-cyan-950 text-center text-3xl m-4">
            Click the <i class="fas fa-plus"></i> button to create a DidgYa!
        </div>`

    for (let i = 0; i < didgYas.length; i++) {
        const didgYa = didgYas[i]
        const didgYaListItem = document.createElement('div')
        didgYaListItem.classList.add('list-group-item','list-group-item-action','rounded-xl','p-2','bg-cyan-950','px-5','flex','flex-row','justify-between','gap-1','items-center')
        didgYaListItem.setAttribute('data-toggle','modal')
        didgYaListItem.setAttribute('data-target', '#modal-delete-DidgYa')
        didgYaListItem.setAttribute('data-id', i)

        didgYaListItem.innerHTML += `<span class="text-base">${didgYa.name}</span>`
        if(didgYa.amount > 0) didgYaListItem.innerHTML += `<span class="text-sm">(${didgYa.amount} ${didgYa.unit})</span>`
        
        didgYaListItem.innerHTML += `
            <span id="click-${didgYa.id}" class="text-3xl ml-4 cursor-pointer"><i class="fa-solid fa-play"></i></span>
            <span id="view-${didgYa.id}" class="text-3xl ml-1 cursor-pointer"><i class="fa-solid fa-eye"></i></span>
            <span id="edit-${didgYa.id}" class="text-3xl ml-1 cursor-pointer"><i class="fa-regular fa-pen-to-square"></i></span>
            <span id="delete-${didgYa.id}" class="text-red-600 text-3xl ml-1 cursor-pointer"><i class="fa-solid fa-trash "></i></span>
        `
        didgYaList.appendChild(didgYaListItem)

        const click = document.getElementById(`click-${didgYa.id}`)
        click.addEventListener('click', function(){
            console.log(`Clicked ${didgYa.name} : ${didgYa.id}`)
            clickDidgYa(didgYa.id)
        })

        const view = document.getElementById(`view-${didgYa.id}`)
        view.addEventListener('click', function(){
            console.log(`Viewing ${didgYa.name} : ${didgYa.id}`)
        })

        const edit = document.getElementById(`edit-${didgYa.id}`)
        edit.addEventListener('click', function(){
            console.log(`Editing ${didgYa.name} : ${didgYa.id}`)
        })
    }
}