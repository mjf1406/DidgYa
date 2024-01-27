const unitTypes = document.getElementsByName('modal-create-DidgYa-unit-type')
unitTypes.forEach(element => {
    element.addEventListener('change', function() {
        if (this.checked == false) return
        const unitTypeSelect = document.getElementById('modal-create-DidgYa-unit')
        const type = this.id.replace("modal-create-DidgYa-","").toUpperCase()
        unitTypeSelect.innerHTML = ""
        
        eval(type).forEach(element => {
            const option = document.createElement('option')
            option.value = element
            option.innerText = element
            unitTypeSelect.appendChild(option)
        });
    })
    if (element.checked == true) {
        const unitTypeSelect = document.getElementById('modal-create-DidgYa-unit')
        const type = element.id.replace("modal-create-DidgYa-","").toUpperCase()
        unitTypeSelect.innerHTML = ""

        eval(type).forEach(element => {
            const option = document.createElement('option')
            option.value = element
            option.innerText = element
            unitTypeSelect.appendChild(option)
        });
    }
});

const buttonCreateDidgYa = document.getElementById('create-DidgYa')
buttonCreateDidgYa.addEventListener('click', async function(e){
    e.preventDefault()

    const name = document.getElementById('modal-create-DidgYa-name')
    const unit = document.getElementById('modal-create-DidgYa-unit')
    const quantity = document.getElementById('modal-create-DidgYa-quantity')
    const emoji = document.getElementById('modal-create-DidgYa-emoji')
    const unitType = getSelectedValueFromRadioGroup('modal-create-DidgYa-unit-type').replace("modal-create-DidgYa-","")
    const inputs = []
    const timed = false

    const created = await createDidgYa(name.value, unit.value, quantity.value, inputs, timed, unitType, emoji.value)
    if (created == 'error') return makeToast(`A Didgya with the name <b>${name.value}</b> already exists!`, 'error')

    name.value = ''
    emoji.value = ''
    unit.value = ''
    quantity.value = ''

    const modal = document.getElementById('modal-create-DidgYa')
    modal.classList.add('hidden')

    const didgYas = getAllLocalDidgYas()
    populateDidgYaList(didgYas)
})

const buttonDeleteAllData = document.getElementById('delete-all-data')
buttonDeleteAllData.addEventListener('click', function(e){
    e.preventDefault()

    localStorage.setItem('didgYas', JSON.stringify(DEFAULT_DIDGYAS))

    const modal = document.getElementById('modal-delete-all')
    modal.classList.add('hidden')

    const didgYas = getAllLocalDidgYas()
    populateDidgYaList(didgYas)
})