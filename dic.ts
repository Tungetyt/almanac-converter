const fs = require('fs')
const data: string = fs.readFileSync('./data.text').toString()

const satellitesData: number[][] = []
let lastIndex = 0
let previousColumnsAmount = 0

data.split('\n').forEach((line) => {
  const rowNumbers = line.replace(/\-/g, ' -').trim().split(/\s+/)

  // Empty row
  if (rowNumbers.length <= 1) {
    // Increase index, in order to populate new arrays
    lastIndex += previousColumnsAmount

    // In case next row will also be empty
    previousColumnsAmount = 0

    // Go to the next row
    return
  }

  previousColumnsAmount = rowNumbers.length

  rowNumbers.forEach((n, i) => {
    const realIndex = i + lastIndex
    if (!satellitesData[realIndex]) satellitesData[realIndex] = []
    satellitesData[realIndex]!.push(+n)
  })
})

const dic = new Map<number, number[]>()

satellitesData.forEach((nums) => {
  dic.set(nums[0]!, nums.splice(1))
})

console.log(dic)
