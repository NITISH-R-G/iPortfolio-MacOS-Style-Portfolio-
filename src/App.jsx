import { Suspense } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import {Navbar, Welcome, Dock, Home} from "./components";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import WindowWrapper from "./hoc/WindowWrapper.jsx";
import { Finder, Resume, Safari, Terminal, Text, Image, Contact} from "./windows";

gsap.registerPlugin(Draggable);

const DesktopWorkspace = ({ children }) => {
    return (
        <div id="desktop-workspace">
            {children}
        </div>
    );
};

const App = () => {
    return (
        <ErrorBoundary>
            <main>
                <Navbar />
                <Welcome />
                <DesktopWorkspace>
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
                </DesktopWorkspace>
                <Dock />
            </main>
        </ErrorBoundary>
    );
};

export default App;
