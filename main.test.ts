import { describe, it, expect } from 'vitest'
import { convertAlmanac } from './main'

describe('convertAlmanac', () => {
  it('should handle unexpected formats to some degree', () => {
    const result = convertAlmanac()
    expect(result).toMatchSnapshot()
    expect(result).toStrictEqual(
      convertAlmanac(
        './data__many-tabs__many-new-lines__moved-satellite-to-other-column.txt'
      )
    )
  })

  it('should handle only one satellite', () => {
    const result = convertAlmanac('./data__just-one-satellite.txt')
    expect(result).toMatchSnapshot()
    expect(result.size).toBe(1)
  })

  it('should handle no satellite', () => {
    const result = convertAlmanac('./data__no-satellite.txt')
    expect(result).toMatchSnapshot()
    expect(result.size).toBe(0)
    expect(result).toStrictEqual(new Map())
  })

  it('should throw an error if the data format is incorrect', () => {
    expect(() => {
      convertAlmanac('./data__invalid.txt')
    }).toThrow("Wrong data format. Expected only numbers to appear.")
  })
})
