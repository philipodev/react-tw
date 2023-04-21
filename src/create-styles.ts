import { useMemo } from 'react'

type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassObject
  | ClassArray
type ClassArray = Array<ClassValue>
type ClassObject = { [key: string]: ClassValue }

export function createStyles<
  C extends Record<string, ClassValue>,
  P extends object
>(classesFn: (params: P) => C) {
  return function useStyles(params?: P) {
    return useMemo(() => {
      const styles = classesFn(params ?? {} as P)

      type Classes = {
        [K in keyof C]: string
      }

      const classes: Classes = {} as Classes

      Object.entries(styles).forEach(([key, value]) => {
        classes[key as keyof C] = classNames(value)
      })

      return { classes, cx: classNames }
    }, [params])
  }
}

function classNames(...args: ClassValue[]): string {
  const classes: string[] = []

  args.forEach((arg) => {
    if (Array.isArray(arg)) {
      if (arg.length <= 3 && typeof arg[0] === 'boolean') {
        const condition = arg[0]
        const class1 = arg[1]
        const class2 = arg.length === 3 ? arg[2] : undefined

        pushClass(classes, classNames(condition ? class1 : class2))
      } else {
        classes.push(classNames(...arg))
      }
    } else {
      pushClass(classes, arg)
    }
  })

  return classes.filter(Boolean).join(' ')
}

function pushClass(classes: string[], arg: ClassValue): void {
  if (typeof arg === 'string') {
    classes.push(String(arg))
  } else if (arg instanceof Object) {
    Object.entries(arg).forEach(([key, value]) => {
      if (typeof value === "boolean" && value) {
        classes.push(key)
      }
    })
  }
}
