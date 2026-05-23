import useWindowStore from "../store/window.js";

const WindowControls = ({ target }) => {
    const { closeWindow } = useWindowStore();
    return (
        <div id="window-controls">
            <button className="close" aria-label="Close" onClick={() => closeWindow(target)}/>
            <button className="minimize" aria-label="Minimize"/>
            <button className="maximize" aria-label="Maximize"/>
        </div>
    )
}
export default WindowControls
