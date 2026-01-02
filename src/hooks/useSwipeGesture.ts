import { useRef, useEffect, RefObject } from 'react';

interface UseSwipeGestureOptions {
  onSwipeLeft?: () => void;
  minSwipeDistance?: number;
  maxVerticalDeviation?: number;
  preventScroll?: boolean;
  enabled?: boolean;
}

export function useSwipeGesture({
  onSwipeLeft,
  minSwipeDistance = 50,
  maxVerticalDeviation = 30,
  preventScroll = false,
  enabled = true
}: UseSwipeGestureOptions): RefObject<HTMLDivElement> {
  const elementRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!enabled || !onSwipeLeft) return;

    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now()
      };
      isScrollingRef.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Detect if user is scrolling vertically
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isScrollingRef.current = true;
      }

      // Prevent default scroll if it's a horizontal swipe
      if (preventScroll && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current || isScrollingRef.current) {
        touchStartRef.current = null;
        return;
      }

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      // Check if it's a valid left swipe (right-to-left)
      const isLeftSwipe = deltaX < 0;
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      const isLongEnough = Math.abs(deltaX) >= minSwipeDistance;
      const isNotTooVertical = Math.abs(deltaY) <= maxVerticalDeviation;
      const isQuickEnough = deltaTime < 500; // Max 500ms for a swipe

      if (isLeftSwipe && isHorizontal && isLongEnough && isNotTooVertical && isQuickEnough) {
        // Check if user is interacting with form inputs
        const target = e.target as HTMLElement;
        const isInput = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.tagName === 'SELECT' ||
                       target.isContentEditable;
        
        if (!isInput) {
          onSwipeLeft();
        }
      }

      touchStartRef.current = null;
    };

    // Mouse events for testing on desktop
    const handleMouseDown = (e: MouseEvent) => {
      touchStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: Date.now()
      };
      isScrollingRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!touchStartRef.current) return;
      const deltaX = e.clientX - touchStartRef.current.x;
      const deltaY = e.clientY - touchStartRef.current.y;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        isScrollingRef.current = true;
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!touchStartRef.current || isScrollingRef.current) {
        touchStartRef.current = null;
        return;
      }

      const deltaX = e.clientX - touchStartRef.current.x;
      const deltaY = e.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;

      const isLeftSwipe = deltaX < 0;
      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      const isLongEnough = Math.abs(deltaX) >= minSwipeDistance;
      const isNotTooVertical = Math.abs(deltaY) <= maxVerticalDeviation;
      const isQuickEnough = deltaTime < 500;

      if (isLeftSwipe && isHorizontal && isLongEnough && isNotTooVertical && isQuickEnough) {
        const target = e.target as HTMLElement;
        const isInput = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.tagName === 'SELECT' ||
                       target.isContentEditable;
        
        if (!isInput) {
          onSwipeLeft();
        }
      }

      touchStartRef.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: !preventScroll });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScroll });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Mouse events for desktop testing
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('mousedown', handleMouseDown);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseup', handleMouseUp);
    };
  }, [enabled, onSwipeLeft, minSwipeDistance, maxVerticalDeviation, preventScroll]);

  return elementRef;
}

