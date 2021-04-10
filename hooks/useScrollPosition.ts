import React from 'react'

const isBrowser = typeof window !== `undefined`

type Position = {
  x: number,
  y: number
}
type GetScrollPositionType = (args: {
  element?: any,
  useWindow: boolean
}) => Position

type EffectType = (args: { prevPosition: Position, currentPosition: Position }) => void



const getScrollPosition: GetScrollPositionType = ({ element, useWindow }) => {
  if (!isBrowser) return { x: 0, y: 0 }

  const target = element ? element.current : document.body
  const position = target.getBoundingClientRect()

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}




export function useScrollPosition(effect: EffectType,
  deps, element, useWindow: boolean, wait: number) {
  const position = React.useRef(getScrollPosition({ useWindow }))

  let throttleTimeout = null

  const callBack = () => {
    const currentPosition = getScrollPosition({ element, useWindow })
    effect({ prevPosition: position.current, currentPosition })
    position.current = currentPosition
    throttleTimeout = null
  }

  React.useEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}
