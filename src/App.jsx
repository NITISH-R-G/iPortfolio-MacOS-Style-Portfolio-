import React, { Suspense, lazy } from "react";
import gsap from "gsap";
import Draggable from "gsap/Draggable";
import {Navbar, Welcome, Dock, Home} from "./components";

const Terminal = lazy(() => import("./windows/Terminal.jsx"));
const Safari = lazy(() => import("./windows/Safari.jsx"));
const Resume = lazy(() => import("./windows/Resume.jsx"));
const Finder = lazy(() => import("./windows/Finder.jsx"));
const Text = lazy(() => import("./windows/Text.jsx"));
const Image = lazy(() => import("./windows/Image.jsx"));
const Contact = lazy(() => import("./windows/Contact.jsx"));

gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />
            <Suspense fallback={<div>Loading windows...</div>}>
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
