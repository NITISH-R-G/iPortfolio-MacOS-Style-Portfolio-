import React, { useState } from "react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { socials } from "../constants";
import { WindowControls } from "../components";

const Contact = () => {
    const [copied, setCopied] = useState(false);

    // State to track clicked social IDs
    const [visitedSocials, setVisitedSocials] = useState([]);

    const email = "nitishrg.8220psgps2020@gmail.com";

    // Logic
    const canClose = visitedSocials.length === socials.length;
    const progress = visitedSocials.length;
    const total = socials.length;
    const progressPercent = (progress / total) * 100;

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSocialClick = (id) => {
        if (!visitedSocials.includes(id)) {
            setVisitedSocials((prev) => [...prev, id]);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#F5F5F7]/80 backdrop-blur-2xl text-gray-900 font-sans overflow-hidden">

            {/* --- macOS Title Bar --- */}
            <header
                id="window-header"
                className="relative flex items-center justify-center h-11 shrink-0 select-none border-b border-gray-300/50 bg-gray-100/50 backdrop-blur-md cursor-move"
            >
                <div className="absolute left-4 flex items-center">
                    {/* Passing canClose to handle the red button logic */}
                    <WindowControls target="contact" canClose={canClose} />
                </div>
                <h2 className="text-[13px] font-semibold text-gray-700/90 tracking-wide drop-shadow-sm">
                    Contact Me
                </h2>
            </header>

            {/* --- Main Content --- */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="flex flex-col items-center gap-6 max-w-sm mx-auto">

                    {/* Profile Header */}
                    <div className="flex flex-col items-center gap-3 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="relative group cursor-default">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                            <img
                                src="/images/adrian.jpg"
                                alt="Adrian"
                                loading="lazy"
                                className="relative w-24 h-24 rounded-full border-[4px] border-white shadow-xl object-cover transform transition-transform duration-500 hover:scale-105"
                            />
                            {/* Status Badge */}
                            <div className={`absolute bottom-0 right-0 p-1.5 rounded-full border-[3px] border-white shadow-sm transition-colors duration-500 ${canClose ? 'bg-green-500' : 'bg-amber-400'}`}></div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Let’s Connect</h3>
                            <p className="text-[13px] text-gray-500 mt-1 font-medium">
                                {!canClose ? (
                                    <span className="flex items-center justify-center gap-1.5 text-gray-400">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                        Explore links to unlock close ({progress}/{total})
                                    </span>
                                ) : (
                                    <span className="text-green-600 font-semibold animate-pulse">
                                        You're all set!
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Email Action Pill */}
                    <button
                        onClick={handleCopyEmail}
                        aria-label="Copy Email"
                        className="group relative w-full overflow-hidden rounded-xl bg-white/60 hover:bg-white border border-white/40 shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98] backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        <div className="relative z-10 flex items-center justify-between px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shadow-sm">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</p>
                                    <p className="text-sm font-semibold text-gray-800 truncate max-w-[180px]">{email}</p>
                                </div>
                            </div>

                            {/* Copy Icon / Feedback */}
                            <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                                {copied ? (
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">Copied</span>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                )}
                            </div>
                        </div>
                    </button>

                    {/* Socials Grid - Control Center Style */}
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-2 px-1">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Social Presence</span>
                            {/* Progress Bar */}
                            <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {socials.map(({ id, bg, link, icon, text }) => {
                                const isVisited = visitedSocials.includes(id);
                                return (
                                    <a
                                        key={id}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleSocialClick(id)}
                                        className={`group relative flex items-center p-3 rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                                            ${isVisited
                                            ? "bg-white border-green-400/30 shadow-[0_4px_12px_-2px_rgba(16,185,129,0.15)]"
                                            : "bg-white/50 border-white/60 hover:bg-white shadow-sm hover:shadow-md"
                                        }
                                        `}
                                    >
                                        {/* Icon Box */}
                                        <div
                                            className="flex items-center justify-center w-10 h-10 rounded-xl shadow-sm transition-all duration-300"
                                            style={{ backgroundColor: isVisited ? "#34C759" : bg }}
                                        >
                                            {isVisited ? (
                                                <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <img src={icon} alt={text} loading="lazy" className="w-5 h-5 brightness-0 invert opacity-95" />
                                            )}
                                        </div>

                                        {/* Label */}
                                        <div className="ml-3 flex flex-col">
                                            <span className={`text-[13px] font-semibold leading-tight ${isVisited ? "text-gray-800" : "text-gray-600 group-hover:text-gray-900"}`}>
                                                {text}
                                            </span>
                                            <span className="text-[10px] text-gray-400 font-medium">
                                                {isVisited ? "Connected" : "Connect"}
                                            </span>
                                        </div>

                                        {/* Subtle Chevron */}
                                        {!isVisited && (
                                            <svg className="absolute right-3 w-4 h-4 text-gray-300 group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;