import React from "react";
const Event = () => {
  return (
    <div>
      {/* onClick, onFocus, onBlur, onKeyDown, onKeyUp, onMouseEnter, onMouseLeave */}
      <button>button test</button>
      {/* onChange, onInput, onFocus, onBlur, onKeyDown, onKeyUp, onClick,
      onInvalid, onPaste, onCopy, onCompositionStart */}
      <input></input>
      {/* onChange, onInput, onFocus, onBlur, onKeyDown, onKeyUp, onPaste, onCopy,
      onCompositionStart */}
      <textarea></textarea>
      {/* onSubmit, onReset, onChange, onInput */}
      <form></form>
      {/* onChange, onFocus, onBlur */}
      <select></select>
      {/* onClick, onChange（<select>経由） */}
      <option></option>
      {/* onClick, onFocus, onBlur, onKeyDown, onMouseEnter, onMouseLeave */}
      <a></a>
      {/* onClick, onMouseEnter, onMouseLeave, onScroll, onDragOver, onDrop,
      onTouchStart, onTouchEnd, onPointerDown, onTransitionEnd */}
      <div> </div>
      {/* onClick, onMouseEnter, onMouseLeave, onFocus, onBlur */}
      <span> </span>
      {/* onClick, onMouseDown, onMouseUp（内部のinputをフォーカス） */}
      <label></label>
      {/* onClick, onLoad, onError, onDragStart */}
      <img />
      {/* onClick, onMouseDown, onMouseMove, onTouchStart, onPointerDown */}
      <svg />
      {/* onLoad, onFocus, onBlur */}
      <iframe />
      {/* onClick（子の <li> で）、onDragOver, onDrop */}
      <ul> </ul>
      <ol></ol>
      {/* onClick, onMouseEnter, onMouseLeave, onDragStart */}
      <li> </li>
      {/* onClick, onMouseMove, onWheel, onPointerDown, onTouchStart, onContextMenu */}
      <canvas> </canvas>
      {/* onPlay, onPause, onEnded, onVolumeChange, onTimeUpdate */}
      <video> </video>
      {/* onPlay, onPause, onEnded, onVolumeChange, onTimeUpdate */}
      <audio> </audio>
      {/* onLoad, onScroll, onResize（※通常はwindowにバインド） */}
      <body> </body>
    </div>
  );
};
export default Event;
