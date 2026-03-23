'use client'

import React from 'react'

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, message = 'Processing...' }) => {
  if (!isVisible) return null

  return (
    <div className="loading-wrapper">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  )
}

export default LoadingOverlay
