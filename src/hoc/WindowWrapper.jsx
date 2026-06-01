// WindowWrapper.jsx
import { useLayoutEffect, useRef } from "react";
import useWindowStore from "../store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Draggable from "gsap/Draggable"; // default import from plugin entry

// register the Draggable plugin only
gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey] || {};
        const ref = useRef(null);

        // open animation when isOpen becomes true
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;
            el.style.display = "block";

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
            );
        }, [isOpen]);

        // make draggable once when element mounts
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;

            // create Draggable instance and return cleanup
            const instances = Draggable.create(el, {
                trigger: el.querySelector("#window-header") || el,
                onPress() {
                    focusWindow(windowKey);
                },
            });

            return () => {
                instances.forEach((inst) => inst.kill && inst.kill());
            };
        }, []);

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen]);

        return (
            <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
                <Component {...props} />
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;
