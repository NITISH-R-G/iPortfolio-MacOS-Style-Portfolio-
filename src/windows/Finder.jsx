import { Resume } from "../windows/index.js";
import { WindowControls } from "../components";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { Search } from "lucide-react";
import useLocationStore from "../store/location.js";
import { locations } from "../constants";
import clsx from "clsx";
import useWindowStore from "../store/window.js";

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();

    const openItem = (item) => {
        if (item.fileType === "pdf") return openWindow("resume");
        if (item.kind === "folder") return setActiveLocation(item);
        if (["fig", "url"].includes(item.fileType) && item.href)
            return window.open(item.href, "_blank");

        // open the appropriate file window and pass the file object as data
        // so windows like `txtfile` and `imgfile` can render their content
        const key = `${item.fileType}${item.kind}`; // e.g. 'txtfile', 'imgfile'
        openWindow(key, item);
    };

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={clsx(
                            item.id === activeLocation?.id ? "active" : "not-active"
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => setActiveLocation(item)}
                            aria-label={`Open ${item.name || item.title}`}
                            className="w-full flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                        >
                            {item.title}
                            <img src={item.icon} className="w-4" alt={item.name} />
                            <p className="text-sm font-medium truncate">
                                {item.name}
                            </p>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <>
            <div id="window-header">
                <WindowControls target="finder" />
                <Search className="icon" />
            </div>

            <div className="bg-white flex h-full">
                <div className="sidebar">
                    {renderList("Favorites", Object.values(locations))}
                    {renderList("Work", locations.work.children)}
                </div>
                <ul className="content">
                    {activeLocation?.children?.map((item) => (
                        <li
                            key={item.id}
                            className={item.position}
                        >
                            <button
                                type="button"
                                onClick={() => openItem(item)}
                                aria-label={`Open ${item.name}`}
                                className="flex flex-col items-center justify-center w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                            >
                                <img src={item.icon} alt={item.name} />
                                <p>{item.name}</p>
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
