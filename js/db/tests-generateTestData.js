// bed time, brush teeth, floss, meal, mouthwash, shake, water
function generateSimpleDidgYaData(numberOfDataPoints) {
    let records = [];
    for (let index = 0; index < numberOfDataPoints.length; index++) {
        const randomDate = randomDate(new Date(2024, 1, 1), new Date());
        records.push({ dt: randomDate });
    }
    return records;
}
function generatePeeData() {}
function generatePoopData() {}
function generateWeightData() {}

// ---------- Helper Functions -----------

function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
}
