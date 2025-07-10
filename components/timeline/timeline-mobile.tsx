"use client"
import React, { useState, useRef, useLayoutEffect, useCallback, useMemo, useEffect } from "react";
import { TimelineDiamond } from "./timeline-diamond"
import { TimelineContinuousPath } from "./timeline-continuous-path"
import type { TimelineProps } from "@/types/timeline"
import { useVisibleDiamonds } from "@/hooks/use-visible-diamonds"

interface Point {
  x: number;
  y: number;
}

export const TimelineMobile = React.memo(function TimelineMobile({ items, onItemSelect }: TimelineProps) {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [diamondPositions, setDiamondPositions] = useState<Point[]>([]);
    const { lastVisibleIndex, handleDiamondVisible } = useVisibleDiamonds();

    // Basic scroll handler for visibility
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const viewportCenter = window.innerHeight / 2;
            for (let i = 0; i < diamondRefs.current.length; i++) {
                const diamond = diamondRefs.current[i];
                if (diamond) {
                    const diamondRect = diamond.getBoundingClientRect();
                    const diamondCenter = diamondRect.top + diamondRect.height / 2;
                    
                    if (diamondCenter <= viewportCenter) {
                        handleDiamondVisible(i);
                    }
                }
            }
        };

        // Initial check and event listener
        setTimeout(handleScroll, 100);
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleDiamondVisible]);

    // Make first diamond visible immediately
    useEffect(() => {
        if (items.length > 0) {
            handleDiamondVisible(0);
        }
    }, [handleDiamondVisible, items.length]);

    // Calculate positions when refs are ready
    const calculatePositions = useCallback(() => {
        if (!containerRef.current || diamondRefs.current.length !== items.length) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const positions: Point[] = [];

        for (let i = 0; i < items.length; i++) {
            const diamond = diamondRefs.current[i];
            if (diamond) {
                const diamondRect = diamond.getBoundingClientRect();
                const x = (diamondRect.left + diamondRect.right) / 2 - containerRect.left;
                const y = (diamondRect.top + diamondRect.bottom) / 2 - containerRect.top;
                positions.push({ x, y });
            } else {
                // Fallback position
                positions.push({ x: 100, y: i * 200 });
            }
        }

        setDiamondPositions(positions);
        setIsReady(true);
    }, [items.length]);

    // Single useLayoutEffect for initialization
    useLayoutEffect(() => {
        const timeoutId = setTimeout(() => {
            calculatePositions();
        }, 300);
        
        return () => clearTimeout(timeoutId);
    }, [calculatePositions]);

    // Diamond ref callback
    const diamondRefCallback = useCallback((el: HTMLDivElement | null, index: number) => {
        diamondRefs.current[index] = el;
        
        // Only recalculate when all refs are set for the first time
        if (el && diamondRefs.current.filter(Boolean).length === items.length && !isReady) {
            setTimeout(calculatePositions, 100);
        }
    }, [items.length, isReady, calculatePositions]);

    // Group items into pairs
    const itemPairs = useMemo(() => {
        const pairs = [];
        for (let i = 0; i < items.length; i += 2) {
            pairs.push(items.slice(i, i + 2));
        }
        return pairs;
    }, [items]);

    // Handlers
    const createItemClickHandler = useCallback((item: typeof items[0]) => {
        return () => onItemSelect(item);
    }, [onItemSelect]);

    const createVisibilityHandler = useCallback((globalIndex: number) => {
        return () => handleDiamondVisible(globalIndex);
    }, [handleDiamondVisible]);

    // Render timeline pair
    const renderTimelinePair = useCallback((pair: typeof items, pairIndex: number) => {
        return (
            <div key={pairIndex} className="relative mb-8 sm:mb-16">
                {/* First item - left side */}
                {pair[0] && (
                    <div
                        ref={(el) => diamondRefCallback(el, pairIndex * 2)}
                        className="flex justify-start pl-4 mb-6"
                    >
                        {!pair[0].isHidden && (
                            <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300 z-10 relative">
                                <TimelineDiamond
                                    title={pair[0].title}
                                    date={pair[0].date}
                                    image={pair[0].image}
                                    onClick={createItemClickHandler(pair[0])}
                                    animationDelay={pairIndex * 2 * 50}
                                    onVisible={createVisibilityHandler(pairIndex * 2)}
                                />
                            </div>
                        )}
                    </div>
                )}
                
                {/* Second item - right side */}
                {pair[1] && (
                    <div
                        ref={(el) => diamondRefCallback(el, pairIndex * 2 + 1)}
                        className="flex justify-end pr-4"
                    >
                        {!pair[1].isHidden && (
                            <div className="transform rotate-1 hover:-rotate-0 transition-transform duration-300 z-10 relative">
                                <TimelineDiamond
                                    title={pair[1].title}
                                    date={pair[1].date}
                                    image={pair[1].image}
                                    onClick={createItemClickHandler(pair[1])}
                                    animationDelay={(pairIndex * 2 + 1) * 50}
                                    onVisible={createVisibilityHandler(pairIndex * 2 + 1)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }, [diamondRefCallback, createItemClickHandler, createVisibilityHandler]);

    return (
        <div className="sm:hidden">
            <div className="text-center mb-16">
                <div className="timeline-title-container">
                    <div className="timeline-title-background"></div>
                    <h2 className="timeline-title-main text-2xl sm:text-3xl font-bold hebrew-title leading-tight">
                        מהתנ"ך ועד היום
                    </h2>
                </div>
            </div>
            
            <div 
                ref={containerRef} 
                className="block md:hidden w-[95%] mx-auto relative px-2 py-4"
                style={{ 
                    willChange: 'auto', 
                    transform: 'translateZ(0)',
                    zIndex: 1,
                    isolation: 'isolate'
                }}
            >
                {itemPairs.map(renderTimelinePair)}
                
                {/* Use the same TimelineContinuousPath component as desktop and tablet */}
                {isReady && containerRef.current && diamondPositions.length > 1 && lastVisibleIndex >= 1 && (
                    <TimelineContinuousPath
                        diamonds={diamondPositions.filter((_, index) => !items[index]?.isHidden)}
                        width={containerRef.current.clientWidth}
                        height={containerRef.current.clientHeight}
                        className="transition-opacity duration-500"
                        animated={true}
                        waviness={0.8}
                        smoothness={0.8}
                        seed={789}
                        visibleUntilIndex={lastVisibleIndex}
                        footprintScale={1.2}
                    />
                )}
            </div>
        </div>
    )
});
