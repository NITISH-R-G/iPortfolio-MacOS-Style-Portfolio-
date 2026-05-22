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
                                aria-label={`Open ${name}`}
                                onClick={() => openWindow(type)}
                                className="w-full h-full"
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
                            <button type="button" aria-label={`icon-${id}`} className="w-full h-full flex items-center justify-center">
                                <img src={img} className="icon-hover" alt={`icon-${id}`} />
                            </button>
                        </li>
                    ))}
                </ul>

                <time>{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
        </nav>
    )
}
export default Navbar
