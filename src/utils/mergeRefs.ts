import { Ref, RefCallback } from 'react'

export function mergeRefs<T = any>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
