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
buttonCreateDidgYa.addEventListener('click', function(e){
    e.preventDefault()

    const name = document.getElementById('modal-create-DidgYa-name')
    const unit = document.getElementById('modal-create-DidgYa-unit')
    const amount = document.getElementById('modal-create-DidgYa-quantity')
    const unitType = getSelectedValueFromRadioGroup('modal-create-DidgYa-unit-type').replace("modal-create-DidgYa-","")

    saveDidgYa(name.value, unit.value, amount.value, unitType)

    name.value = ''
    unit.value = ''
    amount.value = ''
    const modal = document.getElementById('modal-create-DidgYa')
    modal.classList.add('hidden')

    const didgYas = getDidgYas()
    populateDidgYaList(didgYas)
})

const buttonDeleteAllData = document.getElementById('delete-all-data')
buttonDeleteAllData.addEventListener('click', function(e){
    e.preventDefault()

    localStorage.setItem('didgYas', JSON.stringify([]))

    const modal = document.getElementById('modal-delete-all')
    modal.classList.add('hidden')

    const didgYas = getDidgYas()
    populateDidgYaList(didgYas)
})