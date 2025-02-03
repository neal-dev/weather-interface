'use client'
import React from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default RootLayout