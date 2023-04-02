import { describe, it, expect } from 'vitest'
import { assertIsDefined } from './utils'
import { AssertionError } from 'assert'

describe('assertIsDefined function', () => {
  it('should throw an AssertionError when passed a null value', () => {
    expect(() => {
      assertIsDefined(null)
    }).toThrowError(AssertionError)
  })

  it('should throw an AssertionError when passed an undefined value', () => {
    expect(() => {
      assertIsDefined(undefined)
    }).toThrowError(AssertionError)
  })

  it('should not throw an error when passed a non-null, defined value', () => {
    expect(() => {
      assertIsDefined(42)
    }).not.toThrow()
  })

  it('should not throw an error when passed a false boolean value', () => {
    expect(() => {
      assertIsDefined(false)
    }).not.toThrow()
  })

  it('should not throw an error when passed a zero numeric value', () => {
    expect(() => {
      assertIsDefined(0)
    }).not.toThrow()
  })

  it('should not throw an error when passed an empty string', () => {
    expect(() => {
      assertIsDefined('')
    }).not.toThrow()
  })

  it('should not throw an error when passed a NaN value', () => {
    expect(() => {
      assertIsDefined(NaN)
    }).not.toThrow()
  })

  it('should not throw an error when passed a non-null, defined object', () => {
    expect(() => {
      assertIsDefined({})
    }).not.toThrow()
  })

  it('should not throw an error when passed a non-null, defined array', () => {
    expect(() => {
      assertIsDefined([])
    }).not.toThrow()
  })
})
