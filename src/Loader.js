import { useProgress } from "@react-three/drei"
import React, { useEffect, useRef, useState } from "react"
import logoDark from './assets/immers logo dark.png'

const dataInterpolation = (p) => `Loading ${p.toFixed(2)}%`
const fadeTime = 5000
export function Loader() {
  const { active, progress } = useProgress()
  const progressRef = useRef(0)
  const rafRef = useRef(0)
  const progressSpanRef = useRef(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    let t
    if (active !== shown) t = setTimeout(() => setShown(active), fadeTime)
    return () => clearTimeout(t)
  }, [shown, active])

  const updateProgress = React.useCallback(() => {
    if (!progressSpanRef.current) return
    progressRef.current += (progress - progressRef.current) / 2
    if (progressRef.current > 0.95 * progress || progress === 100) progressRef.current = progress
    progressSpanRef.current.innerText = dataInterpolation(progressRef.current)
    if (progressRef.current < progress) rafRef.current = requestAnimationFrame(updateProgress)
  }, [progress])

  useEffect(() => {
    updateProgress()
    return () => cancelAnimationFrame(rafRef.current)
  }, [updateProgress])

  return shown ? (
    <div style={{ ...styles.container, opacity: active ? 1 : 0 }}>
      <h1>
        <img src={logoDark} alt="" />
          Immers Space
      </h1>
      <div>
        <div style={{ ...styles.inner }}>
          <div style={{ ...styles.bar, transform: `scaleX(${progress / 100})` }}></div>
          <span ref={progressSpanRef} style={{ ...styles.data }} />
        </div>
      </div>
    </div>
  ) : null
}

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: '#acbfd0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    transition: `opacity ${fadeTime}ms ease`,
    zIndex: 1000,
  },
  inner: {
    width: 100,
    height: 3,
    background: '#272727',
    textAlign: 'center',
  },
  bar: {
    height: 3,
    width: '100%',
    background: '#052464',
    transition: 'transform 200ms',
    transformOrigin: 'left center',
  },
  data: {
    display: 'inline-block',
    position: 'relative',
    fontVariantNumeric: 'tabular-nums',
    marginTop: '0.8em',
    color: '#052464',
    fontSize: '0.6em',
    fontFamily: `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Roboto, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    whiteSpace: 'nowrap',
  },
}
