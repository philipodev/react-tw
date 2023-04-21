import { createStyles } from './create-styles'
import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'

describe('createStyles', () => {
  it('should return a function', () => {
    const styles = createStyles(() => ({}))
    expect(typeof styles).toBe('function')
  })

  it('should handle conditional array', () => {
    const useStyles = createStyles(() => ({
      test: [true, 'true', 'false'],
    }))

    const { result } = renderHook(() => useStyles())
    expect(result.current.classes.test).toBe('true')

    const useStyles2 = createStyles(() => ({
      test: [true, 'true'],
    }))

    const { result: result2 } = renderHook(() => useStyles2())
    expect(result2.current.classes.test).toBe('true')
  })

  it("should handle parameters", () => {
    const useStyles = createStyles(({ test }: { test: boolean }) => ({
      header: [test, 'true', 'false'],
    }))

    const { result } = renderHook(() => useStyles({ test: true }))
    expect(result.current.classes.header).toBe('true')

    const useStyles2 = createStyles(({ test }: { test: boolean }) => ({
      header: [test, 'true', 'false'],
    }))

    const { result: result2 } = renderHook(() => useStyles2({ test: false }))
    expect(result2.current.classes.header).toBe('false')
  })

  it("should handle arrays", () => {
    const useStyles = createStyles(() => ({
      header: ['bg-white', 'text-black']
    }))

    const { result } = renderHook(() => useStyles())
    expect(result.current.classes.header).toBe('bg-white text-black')
  })

  it("should handle multiple layers of arrays", () => {
    const useStyles = createStyles(() => ({
      header: [['bg-white', 'text-black'], 'text-2xl'],
      card: [
        [true, [
          [true, 'text-red'],
          [false, 'bg-black']
        ]]
      ]
    }));

    const { result } = renderHook(() => useStyles())

    expect(result.current.classes.header).toBe('bg-white text-black text-2xl')
    expect(result.current.classes.card).toBe('text-red')
  })

  it("should handle objects", () => {
    const useStyles = createStyles(() => ({
      header: {
        'bg-white': true,
        'text-black': false,
      }
    }))

    const { result } = renderHook(() => useStyles())
    expect(result.current.classes.header).toBe('bg-white')
  });
});