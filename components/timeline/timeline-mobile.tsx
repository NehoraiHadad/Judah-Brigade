"use client"
import React, { useState, useRef, useLayoutEffect, useCallback, useMemo, useEffect } from "react";
import { TimelineDiamond } from "./timeline-diamond"
import { TimelineContinuousPath } from "./timeline-continuous-path"
import { debounce } from "@/lib/timeline-utils";
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

// Global log collector for mobile debugging
const mobileDebugLogs: string[] = [];
const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    mobileDebugLogs.push(logEntry);
    
    // Keep only last 100 logs to prevent memory issues
    if (mobileDebugLogs.length > 100) {
        mobileDebugLogs.shift();
    }
};

// Add copy logs functionality
const copyLogsToClipboard = async () => {
    try {
        const logsText = mobileDebugLogs.join('\n');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(logsText);
            alert('לוגים הועתקו ללוח! 📋');
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = logsText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('לוגים הועתקו ללוח! 📋');
        }
    } catch (error) {
        console.error('Failed to copy logs:', error);
        alert('שגיאה בהעתקת הלוגים');
    }
};

// Clear logs functionality
const clearLogs = () => {
    mobileDebugLogs.length = 0;
    addDebugLog('Logs cleared by user');
    alert('לוגים נוקו! 🗑️');
};

// Force footsteps to show (emergency button)
const forceShowFootsteps = () => {
    const allSvgs = document.querySelectorAll('svg');
    let totalFixed = 0;
    let debugInfo = '';
    
    allSvgs.forEach((svg, svgIndex) => {
        const rect = svg.getBoundingClientRect();
        const style = window.getComputedStyle(svg);
        
        debugInfo += `SVG ${svgIndex}: ${Math.round(rect.width)}x${Math.round(rect.height)} at (${Math.round(rect.left)},${Math.round(rect.top)}), opacity=${style.opacity}, display=${style.display}\n`;
        
        const footsteps = svg.querySelectorAll('g[class*="footstep-fade"]');
        footsteps.forEach((g, i) => {
            const gStyle = window.getComputedStyle(g);
            if (i < 3) { // Log first 3 for debugging
                debugInfo += `  Footstep ${i}: opacity=${gStyle.opacity}, animation=${gStyle.animation.slice(0,50)}\n`;
            }
            
            (g as HTMLElement).style.opacity = '0.85';
            (g as HTMLElement).style.animation = 'none';
            (g as HTMLElement).style.display = 'block';
            totalFixed++;
        });
    });
    
    addDebugLog(`FORCE SHOW DEBUG:\n${debugInfo}`);
    addDebugLog(`FORCE SHOW: Fixed ${totalFixed} footsteps manually`);
    
    // Show detailed alert
    alert(`הוצגו ${totalFixed} צעדים!\n\nפרטי דיבאג:\n${debugInfo.slice(0, 200)}...`);
};

// Create floating debug buttons
const createDebugButtons = () => {
    // Remove existing buttons if any
    const existingCopy = document.getElementById('copy-logs-btn');
    const existingClear = document.getElementById('clear-logs-btn');
    const existingForce = document.getElementById('force-footsteps-btn');
    if (existingCopy) existingCopy.remove();
    if (existingClear) existingClear.remove();
    if (existingForce) existingForce.remove();

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.id = 'copy-logs-btn';
    copyButton.innerHTML = '📋 העתק לוגים';
    copyButton.style.cssText = `
        position: fixed;
        bottom: 180px;
        right: 10px;
        z-index: 9999;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        font-family: system-ui, -apple-system, sans-serif;
        direction: rtl;
    `;
    
    // Clear button
    const clearButton = document.createElement('button');
    clearButton.id = 'clear-logs-btn';
    clearButton.innerHTML = '🗑️ נקה לוגים';
    clearButton.style.cssText = `
        position: fixed;
        bottom: 130px;
        right: 10px;
        z-index: 9999;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        font-family: system-ui, -apple-system, sans-serif;
        direction: rtl;
    `;
    
    // Force footsteps button
    const forceButton = document.createElement('button');
    forceButton.id = 'force-footsteps-btn';
    forceButton.innerHTML = '👣 הצג צעדים';
    forceButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 10px;
        z-index: 9999;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        font-family: system-ui, -apple-system, sans-serif;
        direction: rtl;
    `;
    
    copyButton.addEventListener('click', copyLogsToClipboard);
    clearButton.addEventListener('click', clearLogs);
    forceButton.addEventListener('click', forceShowFootsteps);
    
    document.body.appendChild(copyButton);
    document.body.appendChild(clearButton);
    document.body.appendChild(forceButton);
    
    return { copyButton, clearButton, forceButton };
};

export const TimelineMobile = React.memo(function TimelineMobile({ items, onItemSelect }: TimelineProps) {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const diamondRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [diamondPositions, setDiamondPositions] = useState<Point[]>([]);
    const { lastVisibleIndex, handleDiamondVisible } = useVisibleDiamonds();
    
    // ✅ Add throttling ref to prevent spam
    const lastUpdateTimeRef = useRef(0);
    const isCalculatingRef = useRef(false);

    // Scroll handler to track visible diamonds
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
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

        // Initial check
        handleScroll();

        // Listen to scroll events on window
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleDiamondVisible]);

    // Ensure the first diamond is considered visible immediately after mount
    useEffect(() => {
        if (items.length > 0) {
            handleDiamondVisible(0);
        }
    }, [handleDiamondVisible, items.length]);

    // Mobile debugging utilities - only run once on mount
    useEffect(() => {
        // Only in production and on mobile
        if (process.env.NODE_ENV === 'production' && window.innerWidth < 768) {
            // Expose debug logger globally for other components
            window.addDebugLog = addDebugLog;
            
            // Create debug buttons
            const { copyButton, clearButton, forceButton } = createDebugButtons();
            
            // Log when timeline mobile component mounts
            const mountLog = `Timeline Mobile mounted: items=${items.length}, containerWidth=${containerRef.current?.clientWidth || 'not ready'}, userAgent=${navigator.userAgent.slice(0, 50)}...`;
            console.log(mountLog);
            addDebugLog(mountLog);

            // Log scroll events (throttled)
            let scrollTimeout: NodeJS.Timeout;
            const logScroll = () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    const scrollLog = `Mobile scroll: scrollY=${window.scrollY}, lastVisibleIndex=${lastVisibleIndex}, diamondPositions=${diamondPositions.length}`;
                    console.log(scrollLog);
                    addDebugLog(scrollLog);
                }, 1000); // Log max once per second
            };

            window.addEventListener('scroll', logScroll);
            
            return () => {
                window.removeEventListener('scroll', logScroll);
                clearTimeout(scrollTimeout);
                copyButton.remove();
                clearButton.remove();
                forceButton.remove();
            };
        }
    }, []); // ✅ Empty dependency array - only run once!

    // ✅ Create a stable reference using useRef to prevent recreation
    const updateDiamondPositionsRef = useRef<() => void>(() => {});
    
    updateDiamondPositionsRef.current = () => {
        // ✅ Prevent spam calls
        const now = Date.now();
        if (now - lastUpdateTimeRef.current < 100) { // Minimum 100ms between calls
            return;
        }
        
        if (isCalculatingRef.current) {
            return; // Already calculating
        }
        
        if (!containerRef.current || diamondRefs.current.length !== items.length) {
            const debugLog = `Diamond positions FAILED: container=${!!containerRef.current}, refs=${diamondRefs.current.length}, items=${items.length}`;
            console.warn(debugLog);
            addDebugLog && addDebugLog(debugLog);
            return;
        }

        isCalculatingRef.current = true;
        lastUpdateTimeRef.current = now;

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
                    // Use fallback position
                    positions.push({ x: 100, y: i * 200 });
                }
            } else {
                const errorLog = `Diamond ref missing for index ${i}`;
                console.warn(errorLog);
                addDebugLog && addDebugLog(errorLog);
                // Use fallback position
                positions.push({ x: 100, y: i * 200 });
            }
        }
        
        const successLog = `Diamond positions calculated: ${positions.length} positions, container=${Math.round(containerRect.width)}x${Math.round(containerRect.height)} [throttled: ${now}]`;
        console.log(successLog);
        addDebugLog && addDebugLog(successLog);
        
        setDiamondPositions(positions);
        setIsReady(true);
        isCalculatingRef.current = false;
    };
    
    // ✅ Stable wrapper function
    const updateDiamondPositions = useCallback(() => {
        updateDiamondPositionsRef.current?.();
    }, []); // ✅ No dependencies - truly stable

    const debouncedUpdatePositions = useMemo(
        () => debounce(updateDiamondPositions, 300), // ✅ Increased debounce to 300ms
        [updateDiamondPositions]
    );

    useLayoutEffect(() => {
        // ✅ Only run initial calculation once per mount
        const timeoutId = setTimeout(() => {
            if (items.length > 0 && diamondPositions.length === 0) {
                updateDiamondPositions();
            }
        }, 500); // Increased delay to ensure everything is loaded
        
        const resizeObserver = new ResizeObserver(() => {
            // ✅ Additional throttling for resize events
            const now = Date.now();
            if (now - lastUpdateTimeRef.current > 500) { // Only resize update every 500ms
                debouncedUpdatePositions();
            }
        });
        
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        // Handle orientation change events for mobile devices
        const handleOrientationChange = () => {
            setTimeout(() => {
                if (items.length > 0) {
                    updateDiamondPositions();
                }
            }, 800); // Longer delay for orientation change
        };
        
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            clearTimeout(timeoutId);
            resizeObserver.disconnect();
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []); // ✅ Empty dependencies - only run once!

    const diamondRefCallback = useCallback((el: HTMLDivElement | null, index: number) => {
        diamondRefs.current[index] = el;
        
        // ✅ Only trigger initial position calculation once when all refs are ready
        if (el && diamondRefs.current.filter(Boolean).length === items.length && diamondPositions.length === 0) {
            setTimeout(() => updateDiamondPositions(), 100);
        }
    }, [items.length]); // ✅ Remove updateDiamondPositions dependency to prevent render loop

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

    // No longer use IntersectionObserver-based visibility handler for mobile
    // The scroll-based detection handles visibility instead
    const createMobileVisibilityHandler = useCallback((globalIndex: number) => {
        // For mobile, we don't need individual onVisible handlers since scroll detection handles it
        return undefined;
    }, []);

    const renderTimelinePair = useCallback((pair: typeof items, pairIndex: number) => {
        return (
            <div key={pairIndex} className="relative mb-8 sm:mb-16">
                {/* First item - left side, higher */}
                {pair[0] && (
                    <div
                        ref={(el) => diamondRefCallback(el, pairIndex * 2)}
                        className="flex justify-start pl-4 mb-6"
                    >
                        {pair[0].isHidden ? (
                            <div className="hidden" style={{ width: '128px', height: '128px' }}>
                                {/* Hidden placeholder */}
                            </div>
                        ) : (
                            <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300 z-10">
                                <TimelineDiamond
                                    title={pair[0].title}
                                    date={pair[0].date}
                                    image={pair[0].image}
                                    onClick={createItemClickHandler(pair[0])}
                                    animationDelay={pairIndex * 2 * 50}
                                    onVisible={createMobileVisibilityHandler(pairIndex * 2)}
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
                            <div className="transform rotate-1 hover:-rotate-0 transition-transform duration-300 z-10">
                                <TimelineDiamond
                                    title={pair[1].title}
                                    date={pair[1].date}
                                    image={pair[1].image}
                                    onClick={createItemClickHandler(pair[1])}
                                    animationDelay={(pairIndex * 2 + 1) * 50}
                                    onVisible={createMobileVisibilityHandler(pairIndex * 2 + 1)}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }, [diamondRefCallback, createItemClickHandler, createMobileVisibilityHandler]);

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
            
            <div ref={containerRef} className="block md:hidden w-[95%] mx-auto relative z-0 px-2 py-4" style={{ willChange: 'auto', transform: 'translateZ(0)' }}>
                {itemPairs.map(renderTimelinePair)}
                
                {isReady && containerRef.current && diamondPositions.length > 1 && (
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
                        visibleUntilIndex={lastVisibleIndex >= 0 ? lastVisibleIndex : 0}
                    />
                )}
            </div>
        </div>
    )
});
