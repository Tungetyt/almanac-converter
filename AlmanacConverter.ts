import * as fs from 'fs'

type SatelliteData = number[]

export default class AlmanacConverter {
  constructor(private readonly pathToAlmanacFile = './data.txt') {}

  convert() {
    const { satellitesData } = this.getAlmanac().reduce(
      ({ lastIndex, columnsAmountInLastRow, satellitesData }, line) => {
        const rowNumbers = this.getRowNumbers(line)

        this.validateAlmanacData(rowNumbers)

        if (rowNumbers.length === 0)
          return this.processEmptyRow(
            lastIndex,
            columnsAmountInLastRow,
            satellitesData
          )

        columnsAmountInLastRow = rowNumbers.length

        this.populateSatellites(rowNumbers, lastIndex, satellitesData)

        return {
          satellitesData,
          columnsAmountInLastRow,
          lastIndex
        }
      },
      {
        satellitesData: [] as SatelliteData[],
        lastIndex: 0,
        columnsAmountInLastRow: 0
      }
    )

    return this.arrayToMap(satellitesData)
  }

  private arrayToMap(satellitesData: SatelliteData[]) {
    return satellitesData.reduce((acc, nums) => {
      if (nums[0] === undefined) throw new Error('Unexpected undefined')

      acc.set(nums[0], nums.splice(1))
      return acc
    }, new Map<number, SatelliteData>())
  }

  private processEmptyRow(
    lastIndex: number,
    columnsAmountInLastRow: number,
    satellitesData: SatelliteData[]
  ) {
    // Increase index, in order to populate new satellites
    lastIndex += columnsAmountInLastRow

    // In case next row will also be empty
    columnsAmountInLastRow = 0

    // Go to the next row
    return {
      satellitesData,
      columnsAmountInLastRow,
      lastIndex
    }
  }

  private getAlmanac() {
    return fs.readFileSync(this.pathToAlmanacFile).toString().split('\n')
  }

  private validateAlmanacData(rowNumbers: number[]) {
    if (rowNumbers.some(Number.isNaN))
      throw new Error(
        'The data format is incorrect. Only numerical values are allowed.'
      )
  }

  private getRowNumbers(line: string) {
    return line
      .replace(/-/g, ' -')
      .split(/\s+/)
      .filter((n) => n)
      .map(Number)
  }

  private populateSatellites(
    rowNumbers: number[],
    lastIndex: number,
    satellitesData: SatelliteData[]
  ) {
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
  }
}
