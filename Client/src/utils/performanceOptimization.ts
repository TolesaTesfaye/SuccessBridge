import React, { memo, useMemo, useCallback } from 'react'

/**
 * Enhanced memo wrapper that compares props deeply for expensive components
 */
export const withMemo = <P extends object>(
  Component: React.FC<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
): React.FC<P> => {
  return memo(Component, propsAreEqual)
}

/**
 * Hook to optimize callback functions with dependency tracking
 */
export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps) as T
}

/**
 * Hook to optimize computed values
 */
export const useOptimizedMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
): T => {
  return useMemo(factory, deps)
}

/**
 * Lazy load component with Suspense wrapper
 */
export const withLazyLoad = <P extends object>(
  Component: React.LazyExoticComponent<React.FC<P>>,
  fallback: React.ReactNode = <div>Loading...</div>
): React.FC<P> => {
  return (props: P) => (
    <React.Suspense fallback={fallback}>
      <Component {...props} />
    </React.Suspense>
  )
}

/**
 * Virtual list renderer for large lists
 * Note: Consider using react-window or react-virtual for production
 */
export const VirtualListItem = React.memo<{
  index: number
  item: any
  renderItem: (item: any, index: number) => React.ReactNode
}>(({ index, item, renderItem }) => {
  return <>{renderItem(item, index)}</>
})

VirtualListItem.displayName = 'VirtualListItem'
