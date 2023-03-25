import * as fs from 'fs'
type SatelliteData = number[]

export const convertAlmanac = (pathToAlmanacFile = './data.txt') => {
  const data: string = fs.readFileSync(pathToAlmanacFile).toString()

  return data
    .split('\n')
    .reduce(
      ({ lastIndex, previousColumnsAmount, satellitesData }, line) => {
        let rowNumbers: number[] = []

        try {
          rowNumbers = line
          .replace(/\-/g, ' -')
          .trim()
          .split(/\s+/)
          .filter(n => n)
          .map((n) => Number(n))
        } catch(err) {
          throw new Error("Wrong data format. Expected only numbers to appear.")
        }

        // Empty row
        if (rowNumbers.length < 1) {
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
}