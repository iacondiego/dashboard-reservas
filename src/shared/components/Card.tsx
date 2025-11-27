import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
}

export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'md'
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl bg-white border border-gray-100
        ${paddingClasses[padding]}
        ${shadowClasses[shadow]}
        ${hover ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
