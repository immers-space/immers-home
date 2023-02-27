import React, { Suspense } from 'react'
import { catchToken } from 'immers-client/source/authUtils'
import logoDark from './assets/immers logo dark.png'
const Scene = React.lazy(() => import('./Scene'))

const tokenCaught = catchToken()

export default function App () {
  if (tokenCaught) {
    return <SimpleLoader/>
  }
  return (
    <Suspense fallback={<SimpleLoader />}>
      <Scene />
    </Suspense>
  )
}

function SimpleLoader() {
  return (
    <div id="simple-loader">
      <h1>
        <img src={logoDark} alt="" />
          Immers Space
      </h1>
    </div>
  )
}