"use client"
import { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { TimelineDiamond } from "./timeline-diamond"
import { TimelineContinuousPath } from "./timeline-continuous-path"
import { debounce } from "@/lib/timeline-utils";
import type { TimelineProps } from "@/types/timeline"

interface Point {
  x: number;
  y: number;
}

export function TimelineMobile({ items, onItemSelect }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [diamondPositions, setDiamondPositions] = useState<Point[]>([]);
    const [isReady, setIsReady] = useState(false);

    const updateDiamondPositions = useCallback(() => {
        if (!containerRef.current || diamondRefs.current.length === 0) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const positions: Point[] = [];

        for (let i = 0; i < items.length; i++) {
            const diamondNode = diamondRefs.current[i];
            if (diamondNode) {
                try {
                    const diamondRect = diamondNode.getBoundingClientRect();
                    
                    const x = (diamondRect.left + diamondRect.right) / 2 - containerRect.left;
                    const y = (diamondRect.top + diamondRect.bottom) / 2 - containerRect.top;
                    
                    positions.push({ x, y });
                } catch (error) {
                    console.warn('Error calculating diamond position for mobile', i, error);
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
    }, [items, diamondPositions]);

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
        
        if (el && diamondRefs.current.filter(Boolean).length === items.length) {
            setTimeout(updateDiamondPositions, 100);
        }
    }, [items.length, updateDiamondPositions]);

    // Group items into pairs for diagonal display
    const itemPairs = useMemo(() => {
        const pairs = [];
        for (let i = 0; i < items.length; i += 2) {
            pairs.push(items.slice(i, i + 2));
        }
        return pairs;
    }, [items]);

    const renderTimelinePair = useCallback((pair: typeof items, pairIndex: number) => {
        return (
            <div key={pairIndex} className="relative mb-12 sm:mb-16">
                {/* First item - left side, higher */}
                {pair[0] && (
                    <div
                        ref={(el) => diamondRefCallback(el, pairIndex * 2)}
                        className="flex justify-start pl-4 mb-6"
                    >
                        <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                            <TimelineDiamond
                                title={pair[0].title}
                                date={pair[0].date}
                                image={pair[0].image}
                                onClick={() => onItemSelect(pair[0])}
                                animationDelay={pairIndex * 2 * 100}
                            />
                        </div>
                    </div>
                )}
                
                {/* Second item - right side, lower, creating diagonal effect */}
                {pair[1] && (
                    <div
                        ref={(el) => diamondRefCallback(el, pairIndex * 2 + 1)}
                        className="flex justify-end pr-4"
                    >
                        <div className="transform rotate-1 hover:-rotate-0 transition-transform duration-300">
                            <TimelineDiamond
                                title={pair[1].title}
                                date={pair[1].date}
                                image={pair[1].image}
                                onClick={() => onItemSelect(pair[1])}
                                animationDelay={(pairIndex * 2 + 1) * 100}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }, [diamondRefCallback, onItemSelect]);

    return (
        <div ref={containerRef} className="block md:hidden w-[95%] mx-auto relative px-2 py-4">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">מהתנ"ך ועד היום</h2>
                <div className="mt-2 w-16 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
            </div>
            {itemPairs.map(renderTimelinePair)}
            
            {isReady && containerRef.current && diamondPositions.length > 1 && (
                <TimelineContinuousPath
                    diamonds={diamondPositions}
                    width={containerRef.current.scrollWidth}
                    height={containerRef.current.scrollHeight}
                    className="transition-opacity duration-500"
                    animated={true}
                    waviness={1.8}
                    smoothness={0.6}
                    seed={789}
                />
            )}
        </div>
    )
}
