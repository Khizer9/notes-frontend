import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import DUMMY_DATA from "./DUMMY_DATA";
import Notes from "./components/Notes/Notes";
import INotes from "./interface/note.interface";

function App() {
  const [noteListes, setNoteLists] = useState<Array<INotes>>(() => {
    const gettingNotes = localStorage.getItem("noteListess");
    if (gettingNotes) {
      console.log(gettingNotes, "dasd");
      return JSON.parse(gettingNotes);
    } else {
      return DUMMY_DATA;
    }
  });

  useEffect(() => {
    const stringfyNotes = JSON.stringify(noteListes);
    localStorage.setItem("noteListess", stringfyNotes);
  }, [noteListes]);

  // const getNotes = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/notes')
  //     console.log(response, "ress")
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const onNoteUpdate = (updatedNote: INotes) => {
    const updatedList = noteListes.map((item: INotes) => {
      if (item?._id === updatedNote?._id) {
        return updatedNote;
      }
      return item;
    });
    console.log(updatedList, "updatedList");
    setNoteLists(updatedList);
  };

  return (
    <div className="App">
      <div className="note-list">
        {noteListes?.map((noteItem, index) => {
          return (
            <Notes
              noteItem={noteItem}
              onNoteUpdate={onNoteUpdate}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
