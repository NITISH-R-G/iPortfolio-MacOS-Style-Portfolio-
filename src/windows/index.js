import { lazy } from 'react';

const Terminal = lazy(() => import('./Terminal.jsx'));
const Safari = lazy(() => import('./Safari.jsx'));
const Resume = lazy(() => import('./Resume.jsx'));
const Finder = lazy(() => import('./Finder.jsx'));
const Text = lazy(() => import('./Text.jsx'));
const Image = lazy(() => import('./Image.jsx'));
const Contact = lazy(() => import('./Contact.jsx'));

export {Terminal , Safari, Resume, Finder , Text , Image , Contact};