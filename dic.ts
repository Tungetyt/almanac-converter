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
  const numbers = line.replace(/\-/g, " -").trim().split(/\s+/)

  if(numbers.length <= 1) {
    shiftToNext += previousColumnsAmount 
    return
  }

  previousColumnsAmount = numbers.length + 1
    
  numbers.forEach((n, i) => {
    const satellite = res[i + shiftToNext] 
    if(!satellite) res[i + shiftToNext] = []
    if(Number.isNaN(n)) return
    res[i + shiftToNext]!.push(+n)
  })  
}) 

res = res.filter(x => x)

const dic = new Map<number, number[]>()

res.forEach((nums) => {
  dic.set(nums[0]!, nums.splice(1))
})

console.log(dic)