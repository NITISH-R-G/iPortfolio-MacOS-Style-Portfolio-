import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { techStack } from "../constants/index.js";
import { Check, Flag } from "lucide-react";
import WindowControls from "../components/WindowControls.jsx";

const Terminal = () => {
    return (
        // Changed Fragment to a Div to enforce dimensions on the WindowWrapper
        <div className="flex flex-col h-auto min-h-[300px] max-h-[80vh] w-full min-w-[350px] max-w-[600px] bg-black/90 text-green-400 font-mono text-sm">

            {/* Header: Fixed height, always visible */}
            <header id="window-header" className="flex items-center justify-between px-4 py-2 bg-gray-800 rounded-t-lg shrink-0 select-none cursor-move">
                <WindowControls target="terminal" />
                <h2 className="ml-4 text-gray-300 font-semibold">Tech Stack</h2>
            </header>

            {/* Content Body: Grows with content, scrolls if too crowded */}
            <div className="techstack flex-1 p-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <p className="mb-4">
                    <span className="font-bold text-yellow-400">@nitish %</span>
                    <span className="ml-2 typing-effect">show tech stack</span>
                </p>

                <div className="label flex border-b border-gray-700 pb-2 mb-4 text-gray-400 text-xs uppercase tracking-wider">
                    <p className="w-32 shrink-0">Category</p>
                    <p>Technologies</p>
                </div>

                <ul className="content space-y-4">
                    {techStack.map(({ category, items }) => (
                        <li className="flex items-start group" key={category}>
                            <div className="w-32 shrink-0 flex items-center text-blue-400 font-bold">
                                <Check className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                                <h3>{category}</h3>
                            </div>

                            <ul className="flex-1 flex flex-wrap gap-1">
                                {items.map((item, i) => (
                                    <li key={i} className="text-gray-300 hover:text-white transition-colors">
                                        {item}
                                        {i < items.length - 1 ? <span className="text-gray-600 mr-1">,</span> : ""}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="footnote mt-8 pt-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500">
                    <p className="flex items-center gap-2">
                        <Check size={14} className="text-green-500" />
                        {techStack.length} stacks loaded (100%)
                    </p>

                    <p className="flex items-center gap-2">
                        <Flag size={12} />
                        Render: 6ms
                    </p>
                </div>
            </div>
        </div>
    );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;