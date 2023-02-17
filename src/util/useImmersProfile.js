import { useEffect, useState } from "react"

/**
 * @returns  {import("immers-client/types/source/client").Profile}
 */
export function useImmersProfile() {
  const [profile, setProfile] = useState(
    document.querySelector('immers-hud')?.immersClient.profile
  )
  useEffect(() => {
    const onProfileChanged = ({ detail }) => setProfile(detail?.profile)
    const immersClient = document.querySelector('immers-hud').immersClient
    immersClient.addEventListener('immers-client-connected', onProfileChanged)
    immersClient.addEventListener('immers-client-disconnected', onProfileChanged)
    immersClient.addEventListener('immers-client-profile-update', onProfileChanged)
    return () => {
      immersClient.removeEventListener('immers-client-connected', onProfileChanged)
      immersClient.removeEventListener('immers-client-disconnected', onProfileChanged)
      immersClient.removeEventListener('immers-client-profile-update', onProfileChanged)
    }
  }, [])
  return profile
}
