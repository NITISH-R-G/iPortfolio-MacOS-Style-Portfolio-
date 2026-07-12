import { WindowControls } from "../components";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { Search } from "lucide-react";
import useLocationStore from "../store/location.js";
import { locations } from "../constants";
import clsx from "clsx";
import useWindowStore from "../store/window.js";
import { useState, useRef, useLayoutEffect, useCallback } from "react";

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow, setScrollTop, windows } = useWindowStore();
    const [selectedFileId, setSelectedFileId] = useState(null);
    const contentRef = useRef(null);
    const scrollTop = windows.finder?.scrollTop || 0;

    // Restore scroll position
    useLayoutEffect(() => {
        if (contentRef.current && scrollTop > 0) {
            contentRef.current.scrollTop = scrollTop;
        }
    }, [scrollTop]); 

    const handleScroll = (e) => {
        setScrollTop("finder", e.target.scrollTop);
    };

    const openItem = useCallback((item) => {
        if (item.fileType === "pdf") return openWindow("resume");
        if (item.kind === "folder") {
            setActiveLocation(item);
            setSelectedFileId(null);
            if (contentRef.current) contentRef.current.scrollTop = 0;
            return;
        }
        if (["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "_blank");

        const key = `${item.fileType}${item.kind}`; 
        openWindow(key, item);
    }, [openWindow, setActiveLocation]);

    const handleKeyDown = useCallback((e) => {
        const items = activeLocation?.children || [];
        if (!items.length) return;

        const currentIndex = items.findIndex(i => i.id === selectedFileId);

        if (e.key === "Escape") {
            setSelectedFileId(null);
        } else if (e.key === "Enter" && selectedFileId) {
            const item = items.find(i => i.id === selectedFileId);
            if (item) openItem(item);
        } else if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) {
            e.preventDefault(); 
            if (currentIndex === -1) {
                setSelectedFileId(items[0].id);
                return;
            }

            // Calculate columns dynamically based on layout
            const children = Array.from(contentRef.current.children);
            let cols = 1;
            if (children.length > 1) {
                const firstY = children[0].offsetTop;
                cols = children.findIndex(c => c.offsetTop > firstY);
                if (cols === -1) cols = children.length; 
            }

            let nextIndex = currentIndex;
            if (e.key === "ArrowRight") nextIndex = Math.min(items.length - 1, currentIndex + 1);
            if (e.key === "ArrowLeft") nextIndex = Math.max(0, currentIndex - 1);
            if (e.key === "ArrowDown") nextIndex = Math.min(items.length - 1, currentIndex + cols);
            if (e.key === "ArrowUp") nextIndex = Math.max(0, currentIndex - cols);

            setSelectedFileId(items[nextIndex].id);
        }
    }, [activeLocation, selectedFileId, openItem]);

    const handleEmptyClick = (e) => {
        if (e.target === e.currentTarget) {
            setSelectedFileId(null);
        }
    };

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li key={item.id} className="w-full">
                        <button
                            type="button"
                            onClick={() => {
                                setActiveLocation(item);
                                setSelectedFileId(null);
                            }}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-2 w-full rounded-md cursor-pointer transition-colors",
                                item.id === activeLocation?.id ? "active bg-blue-100 text-blue-700" : "not-active text-gray-700 hover:bg-gray-200"
                            )}
                            aria-current={item.id === activeLocation?.id ? "page" : undefined}
                        >
                            <img src={item.icon} className="w-4" alt="" aria-hidden="true" loading="lazy" />
                            <span className="text-sm font-medium truncate">
                                {item.name}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <header id="window-header" className="cursor-move">
                <WindowControls target="finder" />
                <Search className="icon" />
            </header>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList("Favorites", Object.values(locations))}
                    {renderList("Work", locations.work.children)}
                </div>
                <ul 
                    ref={contentRef}
                    className="content w-full h-full p-6 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6 content-start overflow-y-auto select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                    onClick={handleEmptyClick}
                    onScroll={handleScroll}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="listbox"
                    aria-label="Files and folders"
                >
                    {activeLocation?.children?.map((item) => (
                        <li key={item.id} className="w-full flex justify-center">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFileId(item.id);
                                }}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    openItem(item);
                                }}
                                className={clsx(
                                    "flex flex-col items-center gap-2 rounded-md p-2 group transition-all w-full border border-transparent",
                                    selectedFileId === item.id 
                                        ? "bg-blue-500/10 border-blue-500/30 shadow-sm" 
                                        : "hover:bg-gray-100"
                                )}
                                aria-selected={selectedFileId === item.id}
                                role="option"
                                aria-label={item.name}
                                title={item.name}
                            >
                                <img src={item.icon} alt="" aria-hidden="true" loading="lazy" className="object-contain object-center size-14 transition-transform" />
                                <span className={clsx(
                                    "text-xs text-center font-medium w-full truncate px-1 rounded-sm",
                                    selectedFileId === item.id ? "bg-blue-500 text-white" : "text-gray-800"
                                )}>
                                    {item.name}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
