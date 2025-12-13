'use client'

import React, { useCallback } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'

type ThemeToggleStart = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
type ThemeToggleVariant = 'circle' | 'default'
type TransitionPosition = { x: number; y: number } | ThemeToggleStart

interface ThemeToggleButtonProps {
  theme: 'light' | 'dark'
  onClick: () => void
  variant?: ThemeToggleVariant
  start?: ThemeToggleStart
  className?: string
}

export function useThemeTransition() {
  const startTransition = useCallback((callback: () => void, position?: TransitionPosition) => {
    if (!document.startViewTransition) {
      callback()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        callback()
      })
    })

    if (position) {
      transition.ready.then(() => {
        let clipPath: { start: string; end: string }
        
        // Check if mobile device
        const isMobile = window.innerWidth <= 768
        
        if (typeof position === 'object' && 'x' in position) {
          // Use actual click coordinates
          const x = position.x
          const y = position.y
          const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          )
          clipPath = {
            start: `circle(0px at ${x}px ${y}px)`,
            end: `circle(${endRadius}px at ${x}px ${y}px)`,
          }
        } else {
          // Use predefined position
          clipPath = getClipPath(position as ThemeToggleStart)
        }
        
        // Adjust animation duration and easing for mobile
        document.documentElement.animate(
          {
            clipPath: [clipPath.start, clipPath.end],
          },
          {
            duration: isMobile ? 300 : 500,
            easing: isMobile ? 'ease-out' : 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
    }
  }, [])

  return { startTransition }
}

function getClipPath(position: ThemeToggleStart) {
  const positions = {
    'top-left': { x: '0%', y: '0%' },
    'top-right': { x: '100%', y: '0%' },
    'bottom-left': { x: '0%', y: '100%' },
    'bottom-right': { x: '100%', y: '100%' },
    'center': { x: '50%', y: '50%' },
  }

  const pos = positions[position]
  return {
    start: `circle(0% at ${pos.x} ${pos.y})`,
    end: `circle(150% at ${pos.x} ${pos.y})`,
  }
}

export function ThemeToggleButton({
  theme,
  onClick,
  variant = 'default',
  start = 'center',
  className = '',
}: ThemeToggleButtonProps) {
  const { startTransition } = useThemeTransition()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    startTransition(() => {
      onClick()
    }, start)
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  )
}
