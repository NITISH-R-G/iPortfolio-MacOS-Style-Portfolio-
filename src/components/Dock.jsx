import { useRef } from "react";
import gsap from "gsap";
import { Tooltip } from "react-tooltip";
import { dockApps } from "../constants";
import useWindowStore from "../store/window";
import { useGSAP } from "@gsap/react";

const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = Array.from(dock.querySelectorAll(".dock-icon"));

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();

            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect();
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);
                const intensity = Math.exp(-(distance ** 2) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                    overwrite: true, // GSAP priority
                });
            });
        };

        const handlePointerMove = (e) => {
            const dockRect = dock.getBoundingClientRect();
            animateIcons(e.clientX - dockRect.left);
        };

        const resetIcons = () => {
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                    overwrite: true,
                })
            );
        };

        dock.addEventListener("pointermove", handlePointerMove);
        dock.addEventListener("pointerleave", resetIcons);

        return () => {
            dock.removeEventListener("pointermove", handlePointerMove);
            dock.removeEventListener("pointerleave", resetIcons);
        };
    }, []);

    const handleClick = (id, canOpen, el) => {
        if (!canOpen) return;

        gsap.fromTo(
            el,
            { scale: 0.96, y: -6 },
            {
                scale: 1,
                y: 0,
                duration: 0.55,
                ease: "expo.out",
            }
        );

        windows[id]?.isOpen ? closeWindow(id) : openWindow(id);
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <div
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={180}
                        >
                            <button
                                type="button"
                                className="dock-icon focus-visible:ring-2 focus-visible:ring-blue-500 focus:outline-none rounded-xl"
                                aria-label={name}
                                disabled={!canOpen}
                                onClick={(e) =>
                                    handleClick(id, canOpen, e.currentTarget)
                                }
                            >
                                <img
                                    src={`/images/${icon}`}
                                    alt={name}
                                    draggable={false}
                                    loading="lazy"
                                    className={canOpen ? "" : "opacity-60"}
                                />
                            </button>
                        </div>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;
