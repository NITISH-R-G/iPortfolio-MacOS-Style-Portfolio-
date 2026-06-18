import useWindowStore from "../store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id="window-controls" className="flex items-center gap-2">
            <button
                type="button"
                className="close rounded-full focus-visible:ring-offset-2"
                aria-label={`Close ${target} window`}
                onClick={() => closeWindow(target)}
            />
            <button
                type="button"
                className="minimize rounded-full focus-visible:ring-offset-2"
                aria-label={`Minimize ${target} window`}
            />
            <button
                type="button"
                className="maximize rounded-full focus-visible:ring-offset-2"
                aria-label={`Maximize ${target} window`}
            />
        </div>
    )
}
export default WindowControls
