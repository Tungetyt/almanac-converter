function fileread(filename: string)
{            
   var contents= fs.readFileSync(filename);
   return contents;
}        
var fs =require("fs");
var data: string = fileread('./data.text').toString();

let res = [] as number[][]

let shiftToNext = 0

let previousColumnsAmount = 0

data.split("\n").forEach((line) => {
  const rowNumbers = line.replace(/\-/g, " -").trim().split(/\s+/)

  if(rowNumbers.length <= 1) {
    shiftToNext += previousColumnsAmount 
    return
  }

  previousColumnsAmount = rowNumbers.length
    
  rowNumbers.forEach((n, i) => {
    if(!res[i + shiftToNext]) res[i + shiftToNext] = []
    res[i + shiftToNext]!.push(+n)
  })  
}) 

const dic = new Map<number, number[]>()

res.forEach((nums) => {
  dic.set(nums[0]!, nums.splice(1))
})

console.log(dic)