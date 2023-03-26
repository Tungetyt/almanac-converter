import * as fs from 'fs'
type SatelliteData = number[]

export const convertAlmanac = (
  pathToAlmanacFile = './data.txt'
): Map<number, SatelliteData> =>
  fs
    .readFileSync(pathToAlmanacFile)
    .toString()
    .split('\n')
    .reduce(
      ({ lastIndex, columnsAmountInLastRow, satellitesData }, line) => {
        const rowNumbers = line
          .replace(/-/g, ' -')
          .trim()
          .split(/\s+/)
          .filter((n) => n)
          .map(Number)

        if (rowNumbers.some(isNaN))
          throw new Error(
            'The data format is incorrect. Only numerical values are allowed.'
          )

        // Empty row
        if (rowNumbers.length === 0) {
          // Increase index, in order to populate new satellites
          lastIndex += columnsAmountInLastRow

          // In case next row will also be empty
          columnsAmountInLastRow = 0

          // Go to the next row
          return {
            satellitesData,
            columnsAmountInLastRow,
            lastIndex,
          }
        }

        columnsAmountInLastRow = rowNumbers.length

        rowNumbers.forEach((n, i) => {
          const realIndex = i + lastIndex

          // New satellite
          if (satellitesData[realIndex] === undefined) {
            satellitesData[realIndex] = [n]
            return
          }

          // Populate existing satellite
          satellitesData[realIndex]?.push(n)
        })

        return {
          satellitesData,
          columnsAmountInLastRow,
          lastIndex,
        }
      },
      {
        satellitesData: [] as SatelliteData[],
        lastIndex: 0,
        columnsAmountInLastRow: 0,
      }
    )
    .satellitesData.reduce((acc, nums) => {
      // Array to Map
      if (nums[0] !== undefined) acc.set(nums[0], nums.splice(1))
      return acc
    }, new Map<number, SatelliteData>())
