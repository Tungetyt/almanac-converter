var fs = require('fs');
var data = fs.readFileSync('./data.txt').toString();
var lastIndex = 0;
var previousColumnsAmount = 0;
var satellitesData = data.split('\n').reduce(function (satellitesData, line) {
    var rowNumbers = line.replace(/\-/g, ' -').trim().split(/\s+/).map(function (n) { return Number(n); });
    // Empty row
    if (rowNumbers.length <= 1) {
        // Increase index, in order to populate new arrays
        lastIndex += previousColumnsAmount;
        // In case next row will also be empty
        previousColumnsAmount = 0;
        // Go to the next row
        return satellitesData;
    }
    previousColumnsAmount = rowNumbers.length;
    rowNumbers.forEach(function (n, i) {
        var realIndex = i + lastIndex;
        if (!satellitesData[realIndex])
            satellitesData[realIndex] = [];
        satellitesData[realIndex].push(n);
    });
    return satellitesData;
}, []);
var dic = new Map();
satellitesData.forEach(function (nums) {
    dic.set(nums[0], nums.splice(1));
});
console.log(dic);
