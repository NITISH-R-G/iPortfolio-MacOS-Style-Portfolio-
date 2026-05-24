import { Suspense } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import {Navbar, Welcome, Dock, Home} from "./components";
import WindowWrapper from "./hoc/WindowWrapper.jsx";
import { Finder, Resume, Safari, Terminal, Text, Image, Contact} from "./windows";

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />
            <Suspense fallback={null}>
                <Terminal />
                <Safari />
                <Resume />
                <Finder />
                <Text />
                <Image />
                <Contact />
            </Suspense>
            <Home/>
        </main>
    );
};

export default App;
