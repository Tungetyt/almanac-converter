var fs = require('fs');
var data = fs.readFileSync('./data.txt').toString();
var dic = data.split('\n').reduce(function (_a, line) {
    var lastIndex = _a.lastIndex, previousColumnsAmount = _a.previousColumnsAmount, satellitesData = _a.satellitesData;
    var rowNumbers = line
        .replace(/\-/g, ' -')
        .trim()
        .split(/\s+/)
        .map(function (n) { return Number(n); });
    // Empty row
    if (rowNumbers.length <= 1) {
        // Increase index, in order to populate new arrays
        lastIndex += previousColumnsAmount;
        // In case next row will also be empty
        previousColumnsAmount = 0;
        // Go to the next row
        return {
            satellitesData: satellitesData,
            previousColumnsAmount: previousColumnsAmount,
            lastIndex: lastIndex
        };
    }
    previousColumnsAmount = rowNumbers.length;
    rowNumbers.forEach(function (n, i) {
        var realIndex = i + lastIndex;
        if (!satellitesData[realIndex])
            satellitesData[realIndex] = [];
        satellitesData[realIndex].push(n);
    });
    return {
        satellitesData: satellitesData,
        previousColumnsAmount: previousColumnsAmount,
        lastIndex: lastIndex
    };
}, {
    satellitesData: [],
    lastIndex: 0,
    previousColumnsAmount: 0
}).satellitesData.reduce(function (acc, nums) {
    acc.set(nums[0], nums.splice(1));
    return acc;
}, new Map());
// const dic = new Map<number, SatelliteData>()
// satellitesData.forEach((nums) => {
//   dic.set(nums[0]!, nums.splice(1))
// })
console.log(dic);
