import { describe, it, expect } from 'vitest'
import { convertAlmanac } from './main'

describe('convertAlmanac', () => {
  it('should handle unexpected formats to some degree', () => {
    const result = convertAlmanac()
    expect(result).toMatchSnapshot()
    expect(result).toStrictEqual(convertAlmanac('./data__too-many-tabs__too-many-new-lines.txt'))
  })

  // it('should handle only one satellite', () => {
  //   expect( convertAlmanac('./data__just-one-satellite.txt')).toMatchSnapshot()
  // })
})
