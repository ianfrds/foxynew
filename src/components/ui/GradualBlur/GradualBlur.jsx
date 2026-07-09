import React from 'react';
import './GradualBlur.css';

function GradualBlur({ position = 'bottom', height = '7rem', opacity = 1, target = 'parent', zIndex = 1000, className = '', style: customStyle = {} }) {
  const isVertical = position === 'top' || position === 'bottom'
  const direction = position === 'bottom' ? 'to bottom' : 'to top'

  const containerStyle = {
    position: target === 'page' ? 'fixed' : 'absolute',
    pointerEvents: 'none',
    zIndex: target === 'page' ? zIndex + 100 : zIndex,
    [position]: 0,
    left: 0,
    right: 0,
    height,
    opacity,
    transition: 'opacity 0.3s ease-out',
    backdropFilter: 'blur(0.5rem)',
    WebkitBackdropFilter: 'blur(0.5rem)',
    maskImage: `linear-gradient(${direction}, transparent 0%, black 40%)`,
    WebkitMaskImage: `linear-gradient(${direction}, transparent 0%, black 40%)`,
    ...customStyle,
  }

  return (
    <div className={`gradual-blur ${target === 'page' ? '' : ''} ${className}`} style={containerStyle} />
  )
}

const GradualBlurMemo = React.memo(GradualBlur)
GradualBlurMemo.displayName = 'GradualBlur'
export default GradualBlurMemo
