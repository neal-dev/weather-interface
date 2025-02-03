import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full items-center justify-center h-screen'>
      {children}
    </div>
  )
}

export default HomeLayout