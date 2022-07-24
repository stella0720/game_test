// import '../lib/firebase'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { RecoilRoot } from 'recoil'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp

