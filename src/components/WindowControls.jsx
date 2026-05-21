import useWindowStore from "../store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id="window-controls" className="flex items-center gap-2">
            <button
                type="button"
                className="close"
                aria-label={`Close ${target} window`}
                onClick={() => closeWindow(target)}
            />
            <button
                type="button"
                className="minimize"
                aria-label={`Minimize ${target} window`}
            />
            <button
                type="button"
                className="maximize"
                aria-label={`Maximize ${target} window`}
            />
        </div>
    )
}
export default WindowControls
