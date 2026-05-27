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
                    <li key={item.id}>
                        <button
                            type="button"
                            onClick={() => setActiveLocation(item)}
                            aria-label={`Open ${item.name || item.title}`}
                            className={clsx(
                                "flex items-center gap-2 w-full px-3 py-2 rounded-md cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
                                item.id === activeLocation?.id ? "active" : "not-active"
                            )}
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
                <ul className="content relative flex-1 p-8">
                    {activeLocation?.children?.map((item) => (
                        <li key={item.id} className={clsx("absolute", item.position)}>
                            <button
                                type="button"
                                onClick={() => openItem(item)}
                                aria-label={`Open ${item.name}`}
                                className="flex items-center flex-col gap-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-1 group"
                            >
                                <img src={item.icon} alt={item.name} className="object-contain object-center size-16 relative group-hover:scale-105" />
                                <p className="text-sm text-center font-medium w-40">{item.name}</p>
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
