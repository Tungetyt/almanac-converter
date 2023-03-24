function fileread(filename: string)
{            
   var contents= fs.readFileSync(filename);
   return contents;
}        
var fs =require("fs");
var data: string = fileread('./data.text').toString();

let satellitesData = [] as number[][]
let shiftToNext = 0
let previousColumnsAmount = 0

data.split("\n").forEach((line) => {
  const rowNumbers = line.replace(/\-/g, " -").trim().split(/\s+/)

  // Empty row
  if(rowNumbers.length <= 1) {
    shiftToNext += previousColumnsAmount 
    previousColumnsAmount = 0
    return
  }

  previousColumnsAmount = rowNumbers.length
  
  rowNumbers.forEach((n, i) => {
    const realIndex = i + shiftToNext
    if(!satellitesData[realIndex]) satellitesData[realIndex] = []
    satellitesData[realIndex]!.push(+n)
  })  
}) 

const dic = new Map<number, number[]>()

satellitesData.forEach((nums) => {
  dic.set(nums[0]!, nums.splice(1))
})

console.log(dic)