export default function Keyboard() {
  return (
    <div className="my-4 flex flex-col items-center">
      <div className="first-row flex">
        <button className="keyboard-button key">q</button>
        <button className="keyboard-button key">w</button>
        <button className="keyboard-button key">e</button>
        <button className="keyboard-button key">r</button>
        <button className="keyboard-button key">t</button>
        <button className="keyboard-button key">y</button>
        <button className="keyboard-button key">u</button>
        <button className="keyboard-button key">i</button>
        <button className="keyboard-button key">o</button>
        <button className="keyboard-button key">p</button>
      </div>
      <div className="second-row my-2 flex">
        <button className="keyboard-button key">a</button>
        <button className="keyboard-button key">s</button>
        <button className="keyboard-button key">d</button>
        <button className="keyboard-button key">f</button>
        <button className="keyboard-button key">g</button>
        <button className="keyboard-button key">h</button>
        <button className="keyboard-button key">j</button>
        <button className="keyboard-button key">k</button>
        <button className="keyboard-button key">l</button>
      </div>
      <div className="third-row flex">
        <button className="keyboard-button key">Del</button>
        <button className="keyboard-button key">z</button>
        <button className="keyboard-button key">x</button>
        <button className="keyboard-button key">c</button>
        <button className="keyboard-button key">v</button>
        <button className="keyboard-button key">b</button>
        <button className="keyboard-button key">n</button>
        <button className="keyboard-button key">m</button>
        <button className="keyboard-button key">Enter</button>
      </div>
    </div>
  );
}
