"use client";

import { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { TimelineDiamond } from "./timeline-diamond";
import { TimelineContinuousPath } from "./timeline-continuous-path";
import { debounce } from "@/lib/timeline-utils";
import type { TimelineProps } from "@/types/timeline";
import { useVisibleDiamonds } from "@/hooks/use-visible-diamonds";

interface Point {
  x: number;
  y: number;
}

export function TimelineDesktop({ items, onItemSelect }: TimelineProps) {
    const rowConfigs = useMemo(() => [
        { startIndex: 0, endIndex: 3, isReversed: false },
        { startIndex: 3, endIndex: 6, isReversed: true },
        { startIndex: 6, endIndex: 9, isReversed: false },
        { startIndex: 9, endIndex: 12, isReversed: true },
        { startIndex: 12, endIndex: 15, isReversed: false },
    ], []);

    const containerRef = useRef<HTMLDivElement>(null);
    const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [diamondPositions, setDiamondPositions] = useState<Point[]>([]);
    const [isReady, setIsReady] = useState(false);

    // Track visible diamonds
    const { lastVisibleIndex, handleDiamondVisible } = useVisibleDiamonds();

    const updateDiamondPositions = useCallback(() => {
        if (!containerRef.current || diamondRefs.current.length !== items.length) {
            return;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const positions: Point[] = [];
        
        for (let i = 0; i < items.length; i++) {
            const diamondNode = diamondRefs.current[i];
            if (diamondNode) {
                try {
                    const diamondRect = diamondNode.getBoundingClientRect();
                    
                    // Calculate center point relative to container
                    const x = (diamondRect.left + diamondRect.right) / 2 - containerRect.left;
                    const y = (diamondRect.top + diamondRect.bottom) / 2 - containerRect.top;
                    
                    positions.push({ x, y });
                } catch (error) {
                    console.warn('Error calculating diamond position', i, error);
                    // Fallback to previous position or default
                    if (diamondPositions[i]) {
                        positions.push(diamondPositions[i]);
                    } else {
                        positions.push({ x: 0, y: 0 });
                    }
                }
            }
        }
        
        setDiamondPositions(positions);
        setIsReady(true);
    }, [items.length, diamondPositions]);

    const debouncedUpdatePositions = useMemo(
        () => debounce(updateDiamondPositions, 150),
        [updateDiamondPositions]
    );

    useLayoutEffect(() => {
        const timeoutId = setTimeout(updateDiamondPositions, 200);
        
        const resizeObserver = new ResizeObserver(debouncedUpdatePositions);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            clearTimeout(timeoutId);
            resizeObserver.disconnect();
        };
    }, [updateDiamondPositions, debouncedUpdatePositions]);

    const diamondRefCallback = useCallback((el: HTMLDivElement | null, index: number) => {
        diamondRefs.current[index] = el;
        
        // Trigger position update when all diamonds are mounted
        if (el && diamondRefs.current.filter(Boolean).length === items.length) {
            setTimeout(updateDiamondPositions, 100);
        }
    }, [items.length, updateDiamondPositions]);

    // Create memoized handlers for better performance
    const createItemClickHandler = useCallback((item: typeof items[0]) => {
        return () => onItemSelect(item);
    }, [onItemSelect]);

    const createVisibilityHandler = useCallback((globalIndex: number) => {
        return () => handleDiamondVisible(globalIndex);
    }, [handleDiamondVisible]);

    const renderRow = useCallback((config: typeof rowConfigs[0], rowIndex: number) => {
        const { startIndex, endIndex, isReversed } = config;
        const rowItems = items.slice(startIndex, endIndex);

        return (
            <div key={rowIndex} className={`flex justify-between items-center ${isReversed ? 'flex-row-reverse' : ''}`}>
                {rowItems.map((item, index) => {
                    const globalIndex = startIndex + index;
                    
                    // Skip hidden items but keep their space
                    if (item.isHidden) {
                        return (
                            <div
                                key={item.id}
                                ref={(el) => diamondRefCallback(el, globalIndex)}
                                className="relative z-10 invisible"
                                style={{ width: '160px', height: '160px' }}
                            >
                                {/* Hidden placeholder */}
                            </div>
                        );
                    }
                    
                    return (
                        <div
                            key={item.id}
                            ref={(el) => diamondRefCallback(el, globalIndex)}
                            className="relative z-10"
                        >
                            <TimelineDiamond
                                title={item.title}
                                date={item.date}
                                image={item.image}
                                onClick={createItemClickHandler(item)}
                                animationDelay={globalIndex * 100}
                                onVisible={createVisibilityHandler(globalIndex)}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }, [items, diamondRefCallback, createItemClickHandler, createVisibilityHandler]);

    return (
        <div ref={containerRef} className="hidden lg:block relative max-w-6xl mx-auto px-8">
            <div className="text-center mb-16">
                {/* Enhanced title with decorative elements */}
                <div className="timeline-title-container">
                    {/* Background decorative element */}
                    <div className="timeline-title-background"></div>
                    
                    {/* Main title */}
                    <h2 className="timeline-title-main text-4xl xl:text-5xl font-bold hebrew-title">
                        מהתנ"ך ועד היום
                    </h2>
                </div>
            </div>
            <div className="space-y-32 xl:space-y-36 pt-20">
                {rowConfigs.map(renderRow)}
            </div>
            
            {isReady && containerRef.current && diamondPositions.length > 1 && lastVisibleIndex >= 1 && (
                <TimelineContinuousPath
                    diamonds={diamondPositions.filter((_, index) => !items[index]?.isHidden)}
                    width={containerRef.current.clientWidth}
                    height={containerRef.current.clientHeight}
                    className="transition-opacity duration-500"
                    animated={true}
                    waviness={1.2}
                    smoothness={0.75}
                    seed={123}
                    visibleUntilIndex={lastVisibleIndex}
                    layoutType="desktop"
                />
            )}
        </div>
    );
}
