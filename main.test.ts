import { describe, it, expect } from 'vitest'
import AlmanacConverter from './main'

describe('AlmanacConverter', () => {
  it('should handle unexpected formats to some degree', () => {
    const result = new AlmanacConverter().convert()
    expect(result).toMatchSnapshot()
    expect(result).toStrictEqual(
      new AlmanacConverter(
        './data__many-tabs__many-new-lines__moved-satellite-to-other-column.txt'
      ).convert()
    )
  })

  it('should handle only one satellite', () => {
    const result = new AlmanacConverter(
      './data__just-one-satellite.txt'
    ).convert()
    expect(result).toMatchSnapshot()
    expect(result.size).toBe(1)
  })

  it('should handle no satellite', () => {
    const result = new AlmanacConverter('./data__no-satellite.txt').convert()
    expect(result).toMatchSnapshot()
    expect(result).toStrictEqual(new Map())
  })

  it('should throw an error if the data format is incorrect', () => {
    expect(() => {
      new AlmanacConverter('./data__invalid.txt').convert()
    }).toThrow(
      'The data format is incorrect. Only numerical values are allowed.'
    )
  })
})
