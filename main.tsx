function fileread(filename)
{            
   var contents= fs.readFileSync(filename);
   return contents;
}        
var fs =require("fs");
var data: string = fileread('./data.text').toString();

const res = [] as number[][]

let shiftToNext = 0

data.split("\n").forEach((line, i) => {
  const numbers = line.replace(/\-/g, " -").trim().split(/\s+/)
  
  if(numbers.length <= 1) 
    shiftToNext += 6
  
  numbers.forEach((n, i) => {
    const satellite = res[i + shiftToNext] 
    if(!satellite) res[i + shiftToNext] = []
    res[i + shiftToNext].push(+n)
  })  
}) 

const dic = new Map<number, number[]>()

res.forEach((nums) => {
  dic.set(nums[0], nums.splice(1))
})

console.log(dic)