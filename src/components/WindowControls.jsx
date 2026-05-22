import useWindowStore from "../store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id="window-controls">
            <button
                type="button"
                aria-label="Close Window"
                className="close"
                onClick={() => closeWindow(target)}
            />
            <button
                type="button"
                aria-label="Minimize Window"
                className="minimize"
            />
            <button
                type="button"
                aria-label="Maximize Window"
                className="maximize"
            />
        </div>
    )
}
export default WindowControls
