import React, { useState, useEffect, useRef } from "react";
import { WindowControls } from "../components";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import {
    ChevronLeft, ChevronRight, Share, Plus, Copy,
    RotateCw, Lock, Globe, X, ExternalLink,
    Github, Linkedin, Instagram, ShieldCheck,
    ArrowLeft, ArrowRight
} from "lucide-react";

const Safari = () => {
    // --- State ---
    const [tabs, setTabs] = useState([
        {
            id: 1,
            title: "LinkedIn | Nitish R.G.",
            domain: "linkedin.com",
            url: "linkedin.com/in/nitish-rg",
            type: "linkedin",
            icon: Linkedin,
            color: "text-[#0A66C2]",
            embeds: [
                "https://www.linkedin.com/embed/feed/update/urn:li:share:7411658925336457216",
                "https://www.linkedin.com/embed/feed/update/urn:li:share:7411469580990251008",
                "https://www.linkedin.com/embed/feed/update/urn:li:share:7408499112779735040",
                "https://www.linkedin.com/embed/feed/update/urn:li:share:7410533468826349568"
            ]
        },
        {
            id: 2,
            title: "GitHub @nitish-rg",
            domain: "github.com",
            url: "github.com/nitish-rg",
            link: "https://github.com/nitish-rg",
            type: "other",
            icon: Github,
            color: "text-[#1F2328]",
            bg: "bg-[#1F2328]/10",
            description: "Check out my repositories and code.",
            embeds: []
        },
        {
            id: 3,
            title: "Instagram",
            domain: "instagram.com",
            url: "instagram.com/nitish.rg",
            link: "https://instagram.com/nitish.rg",
            type: "other",
            icon: Instagram,
            color: "text-[#E1306C]",
            bg: "bg-[#E1306C]/10",
            description: "Follow my visual journey.",
            embeds: []
        }
    ]);

    const [activeTabId, setActiveTabId] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const scrollRef = useRef(null);
    const activeTab = tabs.find(t => t.id === activeTabId);

    // --- Effect: Load LinkedIn Badge Script (ONLY for LinkedIn Tab) ---
    useEffect(() => {
        // 1. Always remove any existing script first to ensure a clean slate
        const existingScript = document.getElementById("linkedin-badge-script");
        if (existingScript) existingScript.remove();

        // 2. Only append the script if the current tab is LinkedIn
        if (activeTab && activeTab.type === 'linkedin') {
            const script = document.createElement("script");
            script.id = "linkedin-badge-script";
            script.src = "https://platform.linkedin.com/badges/js/profile.js";
            script.async = true;
            script.defer = true;
            script.type = "text/javascript";
            document.body.appendChild(script);
        }

        // Cleanup isn't strictly necessary here as we clean up at the start of the effect,
        // but it's good practice.
        return () => {
            const scriptToRemove = document.getElementById("linkedin-badge-script");
            if (scriptToRemove) scriptToRemove.remove();
        };
    }, [activeTabId, activeTab]);

    // --- Handlers ---
    const handleTabClick = (id) => {
        if (activeTabId === id) return;
        setIsLoading(true);
        setActiveTabId(id);
        setTimeout(() => setIsLoading(false), 500);
    };

    const handleCloseTab = (e, id) => {
        e.stopPropagation();
        const newTabs = tabs.filter(t => t.id !== id);
        setTabs(newTabs);
        if (activeTabId === id && newTabs.length > 0) {
            setActiveTabId(newTabs[0].id);
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 480;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const handleWheel = (e) => {
        if (scrollRef.current) {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                if (!e.shiftKey) {
                    scrollRef.current.scrollLeft += e.deltaY;
                }
            }
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#F5F5F7] font-sans text-gray-900 relative rounded-b-xl overflow-hidden">

            {/* --- MacOS Toolbar --- */}
            <header id="window-header" className="bg-[#f3f4f6] border-b border-[#d1d1d1] flex-shrink-0 z-30 cursor-move">
                <div className="flex items-center justify-between px-4 pt-3 pb-2 gap-4">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2 sm:gap-5 w-auto sm:w-1/4">
                        <div className="opacity-90 hover:opacity-100 transition-opacity scale-90 sm:scale-100">
                            <WindowControls target="safari" />
                        </div>
                        <div className="hidden sm:flex items-center gap-3 text-gray-500">
                            <button type="button" className="p-1 rounded hover:bg-black/5 disabled:opacity-30" aria-label="Go Back"><ChevronLeft size={18} /></button>
                            <button type="button" className="p-1 rounded hover:bg-black/5 disabled:opacity-30" aria-label="Go Forward"><ChevronRight size={18} /></button>
                        </div>
                    </div>

                    {/* Address Bar */}
                    <div className="flex-1 flex justify-center min-w-0">
                        <div className="relative flex items-center justify-center gap-2 w-full max-w-2xl h-8 sm:h-9 bg-white border border-gray-300 shadow-sm rounded-lg text-xs sm:text-sm text-gray-700 hover:border-gray-400 transition-colors cursor-text overflow-hidden px-3">
                            <div className="flex-shrink-0 text-gray-400"><Lock size={12} fill="currentColor" /></div>
                            <div className="flex items-center gap-1 truncate selection:bg-blue-200">
                                {activeTab ? (
                                    <>
                                        <span className="opacity-50 text-gray-500 font-medium hidden sm:inline">https://</span>
                                        <span className="font-semibold text-gray-800">{activeTab.domain}</span>
                                        <span className="opacity-50 hidden sm:inline text-gray-500">{activeTab.url.replace(activeTab.domain, "")}</span>
                                    </>
                                ) : <span className="text-gray-400">Search or enter website name</span>}
                            </div>
                            <div className="flex-shrink-0 absolute right-2.5">
                                <RotateCw size={12} className={`text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
                            </div>
                        </div>
                    </div>

                    {/* Right Tools */}
                    <div className="hidden sm:flex items-center justify-end gap-3 w-1/4 text-gray-500">
                        <Share size={16} className="cursor-pointer hover:text-black" />
                        <Plus size={16} className="cursor-pointer hover:text-black" />
                        <Copy size={16} className="cursor-pointer hover:text-black" />
                    </div>
                </div>

                {/* Tab Bar */}
                <div className="flex items-end px-2 gap-1 pt-1 h-8 overflow-x-auto no-scrollbar mask-gradient">
                    {tabs.map((tab) => {
                        const isActive = activeTabId === tab.id;
                        return (
                            <div
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                tabIndex={0}
                                className={`
                                    group relative flex items-center gap-2 px-3 h-7 sm:h-8 min-w-[120px] max-w-[200px] flex-1 
                                    text-xs font-medium rounded-t-lg select-none cursor-pointer transition-all duration-200
                                    ${isActive ? 'bg-[#F5F5F7] text-gray-900 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-black/5'}
                                `}
                            >
                                {!isActive && <div className="absolute right-0 top-2 bottom-2 w-[1px] bg-gray-300 group-hover:hidden" />}
                                <tab.icon size={13} className={`${isActive ? tab.color : "grayscale opacity-60"}`} />
                                <span className="truncate flex-1 pt-0.5">{tab.title.split('|')[0]}</span>
                                <button type="button" onClick={(e) => handleCloseTab(e, tab.id)} aria-label={`Close tab ${tab.title}`} className={`p-0.5 rounded-md hover:bg-gray-300/80 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}><X size={11} strokeWidth={3} /></button>
                            </div>
                        );
                    })}
                </div>
            </header>

            {/* --- CONTENT AREA (Grid Layout) --- */}
            <div className="flex-1 relative bg-[#F5F5F7] overflow-hidden">
                {activeTab ? (
                    <div className={`w-full h-full flex flex-col lg:flex-row transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>

                        {/* --- LEFT: BADGE SECTION (Sticky Sidebar) --- */}
                        <div className="w-full lg:w-[400px] flex-shrink-0 bg-white/50 lg:bg-[#F5F5F7] lg:border-r border-gray-200/50 flex flex-col items-center justify-center p-6 lg:h-full overflow-y-auto z-10">
                            {activeTab.type === 'linkedin' ? (
                                <div className="scale-90 sm:scale-100 shadow-sm bg-white rounded-[4px] overflow-hidden">
                                    <div
                                        className="badge-base LI-profile-badge"
                                        data-locale="en_US"
                                        data-size="large"
                                        data-theme="light"
                                        data-type="HORIZONTAL"
                                        data-vanity="nitish-r-g-15-10-2007-rgn"
                                        data-version="v1"
                                    >
                                        <a
                                            className="badge-base__link LI-simple-link"
                                            href="https://in.linkedin.com/in/nitish-r-g-15-10-2007-rgn?trk=profile-badge"
                                        >
                                            NITISH R.G.
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-sm mb-4 ${activeTab.bg} ${activeTab.color}`}>
                                        <activeTab.icon size={40} strokeWidth={1.5} />
                                    </div>
                                    <h1 className="text-xl font-bold text-gray-900">{activeTab.title}</h1>
                                    <p className="text-gray-500 text-sm mt-2">{activeTab.description}</p>
                                    <a href={activeTab.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 px-5 py-2 bg-[#1d1d1f] hover:bg-[#0071e3] text-white rounded-full text-sm font-medium transition-all">
                                        Visit Profile <ExternalLink size={14} />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* --- RIGHT: CAROUSEL SECTION --- */}
                        <div className="flex-1 h-full overflow-hidden flex flex-col relative bg-[#F5F5F7]">
                            {activeTab.embeds && activeTab.embeds.length > 0 ? (
                                <div className="flex-1 flex flex-col justify-center py-8 lg:py-0 relative">

                                    {/* Section Header */}
                                    <div className="flex items-center gap-4 mb-6 px-8 sm:px-12 w-full">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Activity</span>
                                        <div className="h-[1px] flex-1 bg-gray-200"></div>

                                        {/* Navigation Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => scroll('left')}
                                                className="p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-600 transition-all active:scale-95"
                                                aria-label="Scroll left"
                                            >
                                                <ArrowLeft size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => scroll('right')}
                                                className="p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-600 transition-all active:scale-95"
                                                aria-label="Scroll right"
                                            >
                                                <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Horizontal Carousel */}
                                    <div
                                        ref={scrollRef}
                                        onWheel={handleWheel}
                                        className="
                                            flex overflow-x-auto gap-6 px-8 sm:px-12 pb-8
                                            snap-x snap-mandatory scroll-smooth
                                            w-full items-center no-scrollbar
                                        "
                                    >
                                        {activeTab.embeds.map((embedUrl, index) => (
                                            <div
                                                key={index}
                                                className="
                                                    relative snap-center shrink-0
                                                    bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden
                                                    w-[85vw] sm:w-[450px]
                                                    h-[500px] sm:h-[600px]
                                                "
                                            >
                                                <iframe
                                                    src={`${embedUrl}?collapsed=1`}
                                                    className="w-full h-full border-0"
                                                    title={`Post ${index}`}
                                                    loading="lazy"
                                                ></iframe>

                                                {/* Mobile touch scroll overlay */}
                                                <div className="absolute top-0 w-8 h-full left-0 z-10 sm:hidden"></div>
                                                <div className="absolute top-0 w-8 h-full right-0 z-10 sm:hidden"></div>
                                            </div>
                                        ))}
                                        {/* Spacer */}
                                        <div className="w-8 shrink-0" />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
                                    <activeTab.icon size={48} className="opacity-10 mb-4" />
                                    <p className="text-sm font-medium opacity-50">No posts available to display.</p>
                                </div>
                            )}

                            {/* Security Footer */}
                            <div className="hidden lg:flex justify-center pb-4 text-[10px] uppercase tracking-widest text-gray-400 font-semibold absolute bottom-0 w-full pointer-events-none">
                                <span className="flex items-center gap-1"><ShieldCheck size={10} /> Secure Connection</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Empty Browser State
                    <div className="flex flex-col items-center justify-center h-full text-gray-300">
                        <Globe size={64} strokeWidth={1} className="mb-4 opacity-20" />
                        <p className="text-sm font-medium opacity-50">No tabs open</p>
                        <button type="button" onClick={() => window.location.reload()} aria-label="Restore Session" className="mt-4 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-xs font-medium text-gray-600 hover:text-blue-500 transition-all">
                            Restore Session
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;