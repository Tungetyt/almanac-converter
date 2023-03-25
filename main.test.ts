import { describe, it, expect } from 'vitest'
import { convertAlmanac } from './main'

describe('convertAlmanac', () => {
  it('should handle unexpected formats to some degree', () => {
    const result = convertAlmanac()
    expect(result).toMatchSnapshot()
    expect(result).toStrictEqual(convertAlmanac('./data__too-many-tabs__too-many-new-lines__moved-satellite-to-other-column.txt'))
  })

  it('should handle only one satellite', () => {
    const result = convertAlmanac('./data__just-one-satellite.txt')
    expect( result).toMatchSnapshot()
    expect(result.size).toBe(1)
  })

  it('should handle no satellite', () => {
    const result = convertAlmanac('./data__no-satellite.txt')
    expect( result).toMatchSnapshot()
    expect(result.size).toBe(0)
  })
})
