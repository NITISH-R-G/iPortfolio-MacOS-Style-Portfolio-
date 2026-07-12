// WindowWrapper.jsx
import { useRef, useEffect } from "react";
import useWindowStore from "../store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, isMinimized, isMaximized, isFocused, zIndex } = windows[windowKey] || {};
        const ref = useRef(null);
        const dragInstance = useRef(null);
        const wasOpen = useRef(false);

        // Manage draggable instance and bounds
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            const draggables = Draggable.create(el, {
                trigger: el.querySelector("#window-header") || el,
                bounds: "main", // Clamp to main viewport bounds
                onPress() {
                    focusWindow(windowKey);
                },
            });

            dragInstance.current = draggables[0];

            return () => {
                draggables.forEach((inst) => inst.kill && inst.kill());
            };
        }, []);

        // Handle Maximize logic
        useEffect(() => {
            if (dragInstance.current) {
                if (isMaximized) {
                    dragInstance.current.disable();
                } else {
                    dragInstance.current.enable();
                }
            }
        }, [isMaximized]);

        // Handle Open / Minimize animations
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            if (isOpen && !isMinimized) {
                el.style.display = "block";
                
                // If transitioning from closed, set initial state
                if (!wasOpen.current) {
                    gsap.set(el, { scale: 0.8, opacity: 0, y: 40 });
                }

                gsap.to(el, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
                wasOpen.current = true;
            } else if (isMinimized) {
                gsap.to(el, {
                    scale: 0.2,
                    opacity: 0,
                    y: window.innerHeight / 2, // Move towards dock
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        el.style.display = "none";
                    }
                });
            } else if (!isOpen) {
                el.style.display = "none";
                wasOpen.current = false;
            }
        }, [isOpen, isMinimized]);

        // Maximize classes
        const maximizedClasses = isMaximized 
            ? "!fixed !inset-0 !top-[52px] !w-full !max-w-full !h-[calc(100vh-52px)] !rounded-none !transform-none !transition-all !duration-300"
            : "transition-[border-radius,width,height] duration-300";

        // Optional: dim unfocused windows or their drop shadows
        const focusStyles = !isFocused ? "opacity-95 contrast-95" : "";

        return (
            <section 
                id={windowKey} 
                ref={ref} 
                style={{ zIndex, display: "none" }} 
                className={`absolute ${maximizedClasses} ${focusStyles}`}
                onPointerDownCapture={() => {
                    if (!isFocused) focusWindow(windowKey);
                }}
                data-focused={isFocused}
            >
                <Component {...props} isFocused={isFocused} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;
