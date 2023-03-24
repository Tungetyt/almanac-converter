function fileread(filename) {
    var contents = fs.readFileSync(filename);
    return contents;
}
var fs = require("fs");
var data = fileread('./data.text').toString();
var res = [];
var shiftToNext = 0;
var previousColumnsAmount = 0;
data.split("\n").forEach(function (line) {
    var rowNumbers = line.replace(/\-/g, " -").trim().split(/\s+/);
    if (rowNumbers.length <= 1) {
        shiftToNext += previousColumnsAmount;
        return;
    }
    previousColumnsAmount = rowNumbers.length;
    rowNumbers.forEach(function (n, i) {
        var satellite = res[i + shiftToNext];
        if (!satellite)
            res[i + shiftToNext] = [];
        res[i + shiftToNext].push(+n);
    });
});
var dic = new Map();
res.forEach(function (nums) {
    dic.set(nums[0], nums.splice(1));
});
console.log(dic);
