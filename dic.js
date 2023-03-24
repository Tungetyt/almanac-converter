function fileread(filename) {
    var contents = fs.readFileSync(filename);
    return contents;
}
var fs = require("fs");
var data = fileread('./data.text').toString();
var satellitesData = [];
var shiftToNext = 0;
var previousColumnsAmount = 0;
data.split("\n").forEach(function (line) {
    var rowNumbers = line.replace(/\-/g, " -").trim().split(/\s+/);
    if (rowNumbers.length <= 1) {
        shiftToNext += previousColumnsAmount;
        previousColumnsAmount = 0;
        return;
    }
    previousColumnsAmount = rowNumbers.length;
    rowNumbers.forEach(function (n, i) {
        var realIndex = i + shiftToNext;
        if (!satellitesData[realIndex])
            satellitesData[realIndex] = [];
        satellitesData[realIndex].push(+n);
    });
});
var dic = new Map();
satellitesData.forEach(function (nums) {
    dic.set(nums[0], nums.splice(1));
});
console.log(dic);
