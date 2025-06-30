"use client"
import { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { TimelineDiamond } from "./timeline-diamond"
import { TimelineContinuousPath } from "./timeline-continuous-path"
import { debounce } from "@/lib/timeline-utils";
import type { TimelineProps } from "@/types/timeline"
import { useVisibleDiamonds } from "@/hooks/use-visible-diamonds"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { MobileCarouselControls } from "../ui/mobile-carousel-controls";
import { type CarouselApi } from "@/components/ui/carousel"

interface Point {
  x: number;
  y: number;
}

export function TimelineMobile({ items, onItemSelect }: TimelineProps) {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [diamondPositions, setDiamondPositions] = useState<Point[]>([]);
    const { lastVisibleIndex, handleDiamondVisible } = useVisibleDiamonds();
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

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

    // Create memoized handlers for better performance
    const createItemClickHandler = useCallback((item: typeof items[0]) => {
        return () => onItemSelect(item);
    }, [onItemSelect]);

    const createVisibilityHandler = useCallback((globalIndex: number) => {
        return () => handleDiamondVisible(globalIndex);
    }, [handleDiamondVisible]);

    const renderTimelinePair = useCallback((pair: typeof items, pairIndex: number) => {
        return (
            <div key={pairIndex} className="relative mb-12 sm:mb-16">
                {/* First item - left side, higher */}
                {pair[0] && (
                    <div
                        ref={(el) => diamondRefCallback(el, pairIndex * 2)}
                        className="flex justify-start pl-4 mb-6"
                    >
                        {pair[0].isHidden ? (
                            <div className="invisible" style={{ width: '128px', height: '128px' }}>
                                {/* Hidden placeholder */}
                            </div>
                        ) : (
                            <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
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
                
                {/* Second item - right side, lower, creating diagonal effect */}
                {pair[1] && (
                    <div
                        ref={(el) => diamondRefCallback(el, pairIndex * 2 + 1)}
                        className="flex justify-end pr-4"
                    >
                        {pair[1].isHidden ? (
                            <div className="invisible" style={{ width: '128px', height: '128px' }}>
                                {/* Hidden placeholder */}
                            </div>
                        ) : (
                            <div className="transform rotate-1 hover:-rotate-0 transition-transform duration-300">
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
                {/* Enhanced title with decorative elements */}
                <div className="timeline-title-container">
                    {/* Background decorative element */}
                    <div className="timeline-title-background"></div>
                    
                    {/* Main title */}
                    <h2 className="timeline-title-main text-2xl sm:text-3xl font-bold hebrew-title leading-tight">
                        מהתנ"ך ועד היום
                    </h2>
                </div>
            </div>
            
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
            <div ref={containerRef} className="block md:hidden w-[95%] mx-auto relative px-2 py-4">
                {itemPairs.map(renderTimelinePair)}
                
                {isReady && containerRef.current && diamondPositions.length > 1 && lastVisibleIndex >= 1 && (
                    <TimelineContinuousPath
                        diamonds={diamondPositions.filter((_, index) => !items[index]?.isHidden)}
                        width={containerRef.current.clientWidth}
                        height={containerRef.current.clientHeight}
                        className="transition-opacity duration-500"
                        animated={true}
                        sideOffset={60}
                        waviness={1.2}
                        smoothness={0.8}
                        seed={789}
                        visibleUntilIndex={lastVisibleIndex}
                    />
                )}
            </div>
            </CarouselContent>
            </Carousel>
        </div>
    )
}
