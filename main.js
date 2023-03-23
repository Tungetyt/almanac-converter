function fileread(filename) {
    var contents = fs.readFileSync(filename);
    return contents;
}
var fs = require("fs");
var data = fileread('./data.text').toString();
// data.split("\n").forEach((line, i) => {
//   const realIndex = i % 14
//   if(realIndex === 0){
//     line.trim().split(/\s+/).forEach((id) => {
//       dic.set(+id, [])
//     })  
//   } else {
//     line.trim().split(/\s+/).forEach((id, i) => {
//       dic.set(+id, [])
//     }) 
//   }
// }) 
var res = [];
var realIndex = 0;
data.split("\n").forEach(function (line, i) {
    var numbers = line.replace(/\-/g, " -").trim().split(/\s+/);
    if (numbers.length <= 1) {
        realIndex += 6;
    }
    numbers.forEach(function (n, i) {
        var satelite = res[i + realIndex];
        if (!satelite)
            res[i + realIndex] = [];
        res[i + realIndex].push(+n);
    });
    // const realIndex = i % 14
    // if(realIndex === 0){
    //   line.trim().split(/\s+/).forEach((id, i) => {
    //     dic.set(+id, [])
    //   })  
    // } else {
    //   line.trim().split(/\s+/).forEach((id, i) => {
    //     dic.set(+id, [])
    //   }) 
    // }
});
var dic = new Map();
res.forEach(function (nums) {
    dic.set(nums[0], nums.splice(1));
});
console.log(dic);
