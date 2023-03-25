const fs = require('fs')
const data: string = fs.readFileSync('./data.txt').toString()

type SatelliteData = number[]

const dic = data
  .split('\n')
  .reduce(
    ({ lastIndex, previousColumnsAmount, satellitesData }, line) => {
      const rowNumbers = line
        .replace(/\-/g, ' -')
        .trim()
        .split(/\s+/)
        .map((n) => Number(n))

      // Empty row
      if (rowNumbers.length <= 1) {
        // Increase index, in order to populate new arrays
        lastIndex += previousColumnsAmount

        // In case next row will also be empty
        previousColumnsAmount = 0

        // Go to the next row
        return {
          satellitesData,
          previousColumnsAmount,
          lastIndex,
        }
      }

      previousColumnsAmount = rowNumbers.length

      rowNumbers.forEach((n, i) => {
        const realIndex = i + lastIndex
        if (!satellitesData[realIndex]) satellitesData[realIndex] = []
        satellitesData[realIndex]!.push(n)
      })

      return {
        satellitesData,
        previousColumnsAmount,
        lastIndex,
      }
    },
    {
      satellitesData: [] as SatelliteData[],
      lastIndex: 0,
      previousColumnsAmount: 0,
    }
  )
  .satellitesData.reduce((acc, nums) => {
    acc.set(nums[0]!, nums.splice(1))
    return acc
  }, new Map<number, SatelliteData>())

console.log(dic)
