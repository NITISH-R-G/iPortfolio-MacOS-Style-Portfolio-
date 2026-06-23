import { locations } from "../constants/index.js";
import clsx from "clsx";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";

import useWindowStore from "../store/window.js";
import useLocationStore from "../store/location.js";

gsap.registerPlugin(Draggable);

const projects = locations.work?.children ?? [];

const Home = () => {
        const { setActiveLocation } = useLocationStore();
        const { openWindow } = useWindowStore();

        const handleOpenProjectFinder = (project) => {
                setActiveLocation(project);
                openWindow("finder");
        };

        useGSAP(() => {
                Draggable.create(".folder");
        }, { dependencies: [] });

        return (
                <section id="home">
                        <ul>
                                {projects.map((project) => (
                                        <li
                                                key={project.id}
                                                className={clsx("group folder", project.windowPosition)}
                                        >
                                                <button type="button"

                                                        aria-label={`Open folder ${project.name}`}
                                                        onClick={() => handleOpenProjectFinder(project)}
                                                        className="flex flex-col items-center justify-center w-full h-full rounded-md"
                                                >
                                                        <img src="/images/folder.png" alt={project.name} loading="lazy" />
                                                        <p>{project.name}</p>
                                                </button>
                                        </li>
                                ))}
                        </ul>
                </section>
        );
};

export default Home;
