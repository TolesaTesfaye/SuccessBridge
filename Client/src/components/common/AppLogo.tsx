import React from 'react'
import logo from '@/assets/AppLogo.jpg'

interface AppLogoProps {
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const AppLogo: React.FC<AppLogoProps> = ({ className = '', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
        xl: 'w-12 h-12'
    }

    return (
        <div className={`relative overflow-hidden rounded-xl shadow-lg shadow-blue-500/10 transition-transform hover:scale-105 ${sizeClasses[size]} ${className}`}>
            <img
                src={logo}
                alt="SuccessBridge Logo"
                className="w-full h-full object-cover"
            />
        </div>
    )
}
