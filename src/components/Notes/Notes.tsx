import React, { FC, FocusEvent } from "react";
import INotes from "../../interface/note.interface";
import "./Notes.css";

type props = {
  noteItem: INotes;
  onNoteUpdate: (noteItem: INotes) => void;
};

const Notes: FC<props> = ({ noteItem, onNoteUpdate }) => {
  const handleNoteBlur = (event: FocusEvent<HTMLDivElement, Element>) => {
    const textValue = event?.currentTarget?.textContent;
    if (textValue === noteItem?.text) {
      return;
    }
    const updateNoteObject: INotes = {
      ...noteItem,
      text: textValue || "",
    };
    onNoteUpdate(updateNoteObject);
  };

  return (
    <div className="notes__listItem">
      <div
        onBlur={handleNoteBlur}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="notes__text"
      >
        {noteItem?.text}
      </div>
      <div className="notes__link">
        <a href={noteItem?.link}>{noteItem?.link}</a>
      </div>
    </div>
  );
};

export default Notes;
