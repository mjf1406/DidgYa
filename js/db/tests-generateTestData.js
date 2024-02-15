const DATA_POINTS = 50;
const DATE_END_MOD = 5;
const DATE_START = new Date(2024, 1, 1);
// const DATE_END = new Date( new Date().setDate(new Date().getDate() + DATE_END_MOD) );
const DATE_END = new Date();
const RANDOM_MINUTES_FLOOR = 2;
const RANDOM_MINUTES_CEILING = 360;

function generateTestData() {
    const testData = DEFAULT_DIDGYAS;
    for (let index = 0; index < DEFAULT_DIDGYAS.length; index++) {
        const element = DEFAULT_DIDGYAS[index];

        let records = [];

        const didgyaName = element.name;
        const didgyaInputs = element.inputs;

        if (
            didgyaInputs == null ||
            didgyaInputs == undefined ||
            didgyaInputs.length == 0
        ) {
            records = generateSimpleDidgYaRecords(didgyaName, DATA_POINTS);
        } else {
            records = generateComplexDidgYaRecords(didgyaName, DATA_POINTS);
        }

        testData[index].records = records;
    }
    return testData;
}

// DidgYas that only have dt in records, or have dt and endTime
// -- bed time, brush teeth, floss, meal, mouthwash, shake, water
function generateSimpleDidgYaRecords(didgyaName, numberOfDataPoints) {
    const didgYaData = getLocalDidgyaByName(didgyaName);
    const stopwatch = didgYaData.stopwatch;

    let records = [];
    for (let index = 0; index < numberOfDataPoints; index++) {
        let data = {};
        const randomDate = generateRandomDate(DATE_START, DATE_END);
        const randomMinutes = generateRandomIntegerBetween(
            RANDOM_MINUTES_FLOOR,
            RANDOM_MINUTES_CEILING
        );
        const endTime = randomDate.setHours(
            randomDate.getMinutes() + randomMinutes
        );
        data.dt = randomDate;
        if (stopwatch) data.endTime = endTime;
        records.push(data);
    }
    return records;
}

// DidgYas that have inputs
// -- pee, poop, weight
function generateComplexDidgYaRecords(didgyaName, numberOfDataPoints) {
    const didgYaData = getLocalDidgyaByName(didgyaName);
    const inputs = didgYaData.inputs;
    let records = [];

    for (let index = 0; index < numberOfDataPoints; index++) {
        const randomDate = generateRandomDate(DATE_START, new Date());
        let record = { dt: randomDate };

        for (let index = 0; index < inputs.length; index++) {
            const element = inputs[index];

            const inputName = element.name;
            const inputType = element.type;

            let data = {};

            if (inputType === "select") {
                const inputOptions = element.options;
                const randomIndex = generateRandomIntegerBetween(
                    1,
                    inputOptions.length - 1
                );
                const randomOption = inputOptions[randomIndex];
                data = randomOption.name;
            } else if (inputType === "number") {
                const value = generateRandomIntegerBetween(1, 5);
                data = value;
            } else if (inputType === "boolean") {
                const value = generateRandomIntegerBetween(1, 2);
                let bool = false;
                if (value == 1) bool = true;
                data = bool;
            }

            record[inputName] = data;
        }
        records.push(record);
    }
    return records;
}

// ---------- Helper Functions -----------

function generateRandomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}
