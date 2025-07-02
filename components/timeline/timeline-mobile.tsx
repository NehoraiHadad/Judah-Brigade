"use client"
import React, { useState, useRef, useLayoutEffect, useCallback, useMemo, useEffect } from "react";
import { TimelineDiamond } from "./timeline-diamond"
import { TimelineContinuousPath } from "./timeline-continuous-path"
import type { TimelineProps } from "@/types/timeline"
import { useVisibleDiamonds } from "@/hooks/use-visible-diamonds"

// ✅ Global type declaration for debug logging
declare global {
  interface Window {
    addDebugLog?: (message: string) => void;
  }
}

interface Point {
  x: number;
  y: number;
}

// ✅ SIMPLIFIED: Global debug logger (minimal)
const mobileDebugLogs: string[] = [];
const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    mobileDebugLogs.push(logEntry);
    
    if (mobileDebugLogs.length > 50) { // Reduced to 50 logs
        mobileDebugLogs.shift();
    }
};

// ✅ SIMPLIFIED: Emergency copy function
const copyLogsToClipboard = async () => {
    try {
        const logsText = mobileDebugLogs.join('\n');
        await navigator.clipboard.writeText(logsText);
        alert('לוגים הועתקו ללוח! 📋');
    } catch (error) {
        alert('שגיאה בהעתקת הלוגים');
    }
};

// ✅ SIMPLIFIED: Emergency force footsteps function
const forceShowAllFootsteps = () => {
    const allSvgs = document.querySelectorAll('svg');
    let totalFixed = 0;
    
    allSvgs.forEach((svg) => {
        // Force SVG to be visible
        svg.style.display = 'block';
        svg.style.opacity = '1';
        svg.style.visibility = 'visible';
        svg.style.zIndex = '10';
        
        const footsteps = svg.querySelectorAll('g[class*="footstep"], g > *');
        footsteps.forEach((g) => {
            (g as HTMLElement).style.opacity = '0.8';
            (g as HTMLElement).style.display = 'block';
            (g as HTMLElement).style.visibility = 'visible';
            (g as HTMLElement).style.animation = 'none';
            totalFixed++;
        });
    });
    
    addDebugLog(`FORCE FOOTSTEPS: Fixed ${totalFixed} elements`);
    alert(`הוכרחו ${totalFixed} צעדים להופיע! 👣`);
};

// ✅ SIMPLIFIED: Two debug buttons
const createDebugButtons = () => {
    const existingLog = document.getElementById('mobile-log-btn');
    const existingForce = document.getElementById('mobile-force-btn');
    if (existingLog) existingLog.remove();
    if (existingForce) existingForce.remove();

    // Copy logs button
    const logButton = document.createElement('button');
    logButton.id = 'mobile-log-btn';
    logButton.innerHTML = '📋 לוגים';
    logButton.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 10px;
        z-index: 9999;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        font-family: system-ui, -apple-system, sans-serif;
    `;
    
    // Force footsteps button
    const forceButton = document.createElement('button');
    forceButton.id = 'mobile-force-btn';
    forceButton.innerHTML = '👣 כפה צעדים';
    forceButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 10px;
        z-index: 9999;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        font-family: system-ui, -apple-system, sans-serif;
    `;
    
    logButton.addEventListener('click', copyLogsToClipboard);
    forceButton.addEventListener('click', forceShowAllFootsteps);
    
    document.body.appendChild(logButton);
    document.body.appendChild(forceButton);
    
    return { logButton, forceButton };
};

// ✅ SIMPLIFIED: Static footsteps without any effects
const createStaticFootsteps = (containerRef: React.RefObject<HTMLDivElement | null>, positions: Point[]) => {
    if (!containerRef.current || positions.length < 2) return;
    
    const container = containerRef.current;
    const existingFootsteps = container.querySelector('.static-footsteps');
    if (existingFootsteps) existingFootsteps.remove();
    
    const footstepsContainer = document.createElement('div');
    footstepsContainer.className = 'static-footsteps';
    footstepsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    
    // Create simple path between diamonds
    for (let i = 0; i < positions.length - 1; i++) {
        const start = positions[i];
        const end = positions[i + 1];
        
        // Calculate distance and steps
        const distance = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        const steps = Math.floor(distance / 30); // Every 30px
        
        for (let step = 0; step <= steps; step++) {
            const progress = step / steps;
            const x = start.x + (end.x - start.x) * progress;
            const y = start.y + (end.y - start.y) * progress;
            
            const footprint = document.createElement('div');
            footprint.innerHTML = step % 2 === 0 ? '👣' : '🦶'; // Alternate footprints
            footprint.style.cssText = `
                position: absolute;
                left: ${x - 8}px;
                top: ${y - 8}px;
                font-size: 16px;
                opacity: 0.7;
                transform: rotate(${Math.random() * 20 - 10}deg);
                z-index: 5;
                pointer-events: none;
            `;
            
            footstepsContainer.appendChild(footprint);
        }
    }
    
    container.appendChild(footstepsContainer);
    addDebugLog(`Static footsteps created: ${footstepsContainer.children.length} footprints`);
};

export const TimelineMobile = React.memo(function TimelineMobile({ items, onItemSelect }: TimelineProps) {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [diamondPositions, setDiamondPositions] = useState<Point[]>([]);
    const { lastVisibleIndex, handleDiamondVisible } = useVisibleDiamonds();

    // ✅ SIMPLIFIED: Basic scroll handler for visibility
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

    // ✅ SIMPLIFIED: Make first diamond visible immediately
    useEffect(() => {
        if (items.length > 0) {
            handleDiamondVisible(0);
        }
    }, [handleDiamondVisible, items.length]);

    // ✅ SIMPLIFIED: Mobile debugging (only in production)
    useEffect(() => {
        if (process.env.NODE_ENV === 'production' && window.innerWidth < 768) {
            window.addDebugLog = addDebugLog;
            const { logButton, forceButton } = createDebugButtons();
            addDebugLog(`Mobile Timeline: ${items.length} items loaded`);
            
            return () => {
                logButton.remove();
                forceButton.remove();
            };
        }
    }, [items.length]);

    // ✅ NEW: Create static footsteps when positions are ready
    useEffect(() => {
        if (isReady && diamondPositions.length > 1) {
            // Add delay to ensure DOM is ready
            setTimeout(() => {
                createStaticFootsteps(containerRef, diamondPositions);
            }, 500);
        }
    }, [isReady, diamondPositions]);

    // ✅ SIMPLIFIED: Calculate positions ONCE when refs are ready
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

        addDebugLog(`Positions calculated: ${positions.length} diamonds`);
        setDiamondPositions(positions);
        setIsReady(true);
    }, [items.length]);

    // ✅ SIMPLIFIED: Single useLayoutEffect for initialization
    useLayoutEffect(() => {
        const timeoutId = setTimeout(() => {
            calculatePositions();
        }, 300); // Single delay
        
        return () => clearTimeout(timeoutId);
    }, [calculatePositions]);

    // ✅ SIMPLIFIED: Diamond ref callback without complex logic
    const diamondRefCallback = useCallback((el: HTMLDivElement | null, index: number) => {
        diamondRefs.current[index] = el;
        
        // Only recalculate when all refs are set for the first time
        if (el && diamondRefs.current.filter(Boolean).length === items.length && !isReady) {
            setTimeout(calculatePositions, 100);
        }
    }, [items.length, isReady, calculatePositions]);

    // ✅ SIMPLIFIED: Group items into pairs
    const itemPairs = useMemo(() => {
        const pairs = [];
        for (let i = 0; i < items.length; i += 2) {
            pairs.push(items.slice(i, i + 2));
        }
        return pairs;
    }, [items]);

    // ✅ SIMPLIFIED: Handlers
    const createItemClickHandler = useCallback((item: typeof items[0]) => {
        return () => onItemSelect(item);
    }, [onItemSelect]);

    // ✅ SIMPLIFIED: Render timeline pair
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
                            <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300 z-10">
                                <TimelineDiamond
                                    title={pair[0].title}
                                    date={pair[0].date}
                                    image={pair[0].image}
                                    onClick={createItemClickHandler(pair[0])}
                                    animationDelay={pairIndex * 2 * 50}
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
                            <div className="transform rotate-1 hover:-rotate-0 transition-transform duration-300 z-10">
                                <TimelineDiamond
                                    title={pair[1].title}
                                    date={pair[1].date}
                                    image={pair[1].image}
                                    onClick={createItemClickHandler(pair[1])}
                                    animationDelay={(pairIndex * 2 + 1) * 50}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }, [diamondRefCallback, createItemClickHandler]);

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
                    zIndex: 1, // ✅ Ensure container is above background
                    isolation: 'isolate' // ✅ Create new stacking context
                }}
            >
                {itemPairs.map(renderTimelinePair)}
                
                {/* ✅ Static footsteps are created via useEffect above - no complex component needed */}
            </div>
        </div>
    )
});
