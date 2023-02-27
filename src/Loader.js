import { useProgress } from "@react-three/drei"
import React, { useEffect, useRef, useState } from "react"
import logoDark from './assets/immers logo dark.png'

const dataInterpolation = (p) => `Loading ${p.toFixed(2)}%`
const fadeTime = 2500
const skipTime = 5000
export function Loader({ handleSkipLoading, handleLoaderFinished }) {
  const { active, progress } = useProgress()
  const progressRef = useRef(0)
  const rafRef = useRef(0)
  const progressSpanRef = useRef(null)
  const [firstRender, setFirstRender] = useState(true)
  const [shown, setShown] = useState(true)
  const [skipShown, setSkipShown] = useState(false)
  // avoid starting without loader and fading in
  const loaderActive = firstRender || active

  useEffect(() => {
    let t
    if (!loaderActive) {
      t = setTimeout(() => {
        setShown(false)
        handleLoaderFinished?.()
      }, fadeTime)
    }
    return () => clearTimeout(t)
  }, [loaderActive, handleLoaderFinished])

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

  useEffect(() => {
    if (!loaderActive) {
      // clears the timeout once loaded so skip btn doesn't pop-in during fade-out
      return
    }
    const timer = setTimeout(() => setSkipShown(true), skipTime)
    return () => clearTimeout(timer)
  }, [loaderActive])

  useEffect(() => {
    setFirstRender(false)
  }, [])

  return shown ? (
    <div style={{ ...styles.container, opacity: loaderActive ? 1 : 0, pointerEvents: loaderActive ? 'all' : 'none' }}>
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
      {skipShown && (
        <div>
          <p>This is taking a while...</p>
          <button onClick={handleSkipLoading}>Skip 3D content and show the text</button>
        </div>
      )}
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
    zIndex: 50,
  },
  inner: {
    width: 100,
    height: 3,
    marginBottom: 40,
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
