import React from 'react'

interface AuthLayoutProps{
    children:React.ReactNode
}

const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div className='flex items-center justify-center mx-auto h-screen'>
        {children}
    </div>
  )
}

export default AuthLayout