import useWindowStore from "../store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id="window-controls" className="flex items-center gap-2">
            <button
                type="button"
                className="close focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 rounded-full"
                aria-label={`Close ${target} window`}
                onClick={() => closeWindow(target)}
            />
            <button
                type="button"
                className="minimize focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500 rounded-full"
                aria-label={`Minimize ${target} window`}
            />
            <button
                type="button"
                className="maximize focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 rounded-full"
                aria-label={`Maximize ${target} window`}
            />
        </div>
    )
}
export default WindowControls
