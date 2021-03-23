import { signin } from 'next-auth/client'
import React from 'react'
import { Loader } from '../components/loader'

function Auth() {



  React.useEffect(() => {
    signin('google', { callbackUrl: '/' })


  }, [])

  return (
    <div className='container'>
      <Loader />
    </div>

  )

}

export default Auth