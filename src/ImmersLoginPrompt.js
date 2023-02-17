import React, { useEffect, useState } from "react"
import { useImmersProfile } from "./util/useImmersProfile"

export function ImmersLoginPrompt({ currentWaypoint, hud }) {
  const [didOpenHud, setDidOpenHud] = useState(false)
  const profile = useImmersProfile()
  const handleRegister = evt => {
    evt.preventDefault()
    hud.current.immersClient.login(window.location.href, 'modAdditive', undefined, true)
  }
  useEffect(() => {
    const atWaypoint3 = currentWaypoint >= 3 && currentWaypoint <= 3.25
    const isHudClosed = hud.current.getAttribute('open') !== 'true'
    if (atWaypoint3 && isHudClosed) {
      hud.current.setAttribute('open', 'true')
      setDidOpenHud(true)
    } else if (!atWaypoint3 && didOpenHud) {
      hud.current.setAttribute('open', 'false')
      setDidOpenHud(false)
    }
  }, [profile, currentWaypoint, hud, didOpenHud])
  if (!profile) {
    return (
      <p>
        You can even bring your identity into this virtual world!
        If you have an account on any Immers Server, just enter your
        handle below to login
        and this character will transform into your avatar.
        Don't have an account? <a href="https://immers.space/auth/login" onClick={handleRegister}>
          Create one on immers.space
        </a>.
      </p>
    )
  }
  return (
    <p>
      Howdy, {profile.displayName}!{" "}
      {profile.avatarModel && <span>Nice avatar.</span>}
      {!profile.avatarModel && (
        <span>
          You don't have an avatar yet. You can pick one up at our{" "}
          <a href="https://nice.freetreasures.shop" target="_blank" rel="noreferrer">
            Nice Free Treasures Shop
          </a>. Just tell the shopkeep your <em>username</em> is <strong>{profile.username}</strong> and
          your <em>immer</em> is <strong>{profile.homeImmer}</strong>, make sure to
          press <strong>Set Avatar</strong> at the end, and your new avatar will be here
          when you get back.
        </span>
      )}
    </p>
  )
  
}
