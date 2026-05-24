import dayjs from "dayjs"

import {navIcons, navLinks} from "../constants";
import useWindowStore from "../store/window.js";

const Navbar = () => {
    const { openWindow } = useWindowStore();
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo" />
                <p className="font-bold">Nitish's Portfolio</p>

                <ul>
                    { navLinks.map(({ id , name, type}) => (
                        <li key={id}>
                            <button
                                type="button"
                                onClick={() => openWindow(type)}
                                aria-label={`Open ${name}`}
                                className="w-full h-full flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
                            >
                                <p>{name}</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <ul>
                    { navIcons.map(({ id, img}) => (
                        <li key={id}>
                            <img src={img} className="icon-hover" alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>

                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}
export default Navbar
