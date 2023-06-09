import * as fs from 'fs'
import { assertIsDefined } from './utils'

// List of indexes with coordinates of the satellites
type SatelliteData = number[]

export default class AlmanacConverter {
  constructor(private readonly pathToAlmanacFile = './data.txt') {}

  convert() {
    const satellitesData = this.convertToArray()

    return this.arrayToMap(satellitesData)
  }

  private convertToArray() {
    return this.getAlmanac().reduce(
      ({ satellitesData, satellitesAmountInLastRow, lastIndex }, line) => {
        const rowNumbers = this.getRowNumbers(line)

        this.validateRowNumbers(rowNumbers)

        if (rowNumbers.length === 0)
          return this.processEmptyRow(
            satellitesData,
            satellitesAmountInLastRow,
            lastIndex
          )

        return {
          satellitesData: this.getNextSatelliteData(
            satellitesData,
            rowNumbers,
            lastIndex
          ),
          satellitesAmountInLastRow: rowNumbers.length,
          lastIndex
        }
      },
      {
        satellitesData: [] as SatelliteData[],
        satellitesAmountInLastRow: 0,
        lastIndex: 0
      }
    ).satellitesData
  }

  private arrayToMap(satellitesData: SatelliteData[]) {
    return satellitesData.reduce((acc, nums) => {
      const realIndex = nums[0]
      assertIsDefined<typeof realIndex>(realIndex)

      acc.set(realIndex, nums.splice(1))
      return acc
    }, new Map<number, SatelliteData>())
  }

  private processEmptyRow(
    satellitesData: SatelliteData[],
    satellitesAmountInLastRow: number,
    lastIndex: number
  ) {
    return {
      satellitesData,
      satellitesAmountInLastRow: 0, // In case next row will also be empty
      lastIndex: lastIndex + satellitesAmountInLastRow // Increase index, in order to populate new satellites
    }
  }

  private getAlmanac() {
    return fs.readFileSync(this.pathToAlmanacFile).toString().split('\n')
  }

  private validateRowNumbers(rowNumbers: number[]) {
    if (rowNumbers.some(Number.isNaN))
      throw new Error(
        'The data format is incorrect. Only numerical values are allowed.'
      )
  }

  private getRowNumbers(line: string) {
    return line
      .replace(/-/g, ' -')
      .split(/\s+/)
      .filter(Boolean)
      .map(Number)
  }

  private getNextSatelliteData(
    satellitesData: SatelliteData[],
    rowNumbers: number[],
    lastIndex: number
  ): SatelliteData[] {
    return rowNumbers.reduce(
      (acc, n, i) => {
        const realIndex = i + lastIndex

        if (acc[realIndex] === undefined) acc[realIndex] = [n]
        else acc[realIndex] = [...acc[realIndex]!, n]

        return acc
      },
      [...satellitesData]
    )
  }
}
