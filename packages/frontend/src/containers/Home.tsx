import "./Home.css";
import { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { v1 as uuidv1 } from "uuid";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import { NoteType } from "../types/note";
import NewNote from "./NewNote.tsx";
import Note from "./Note.tsx";

export default function Home() {
  const [notes, setNotes] = useState<Array<NoteType>>([]);
  const { user } = useAppContext();
  const isAuthenticated = user?.isAuthenticated;

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes", {});
  }

  async function handleNewNote(content: string) {
    const noteId = uuidv1();
    setNotes([
      ...notes,
      { noteId, content, createdAt: new Date().toISOString() },
    ]);
    try {
      await API.post("notes", "/notes", {
        body: content,
      });
    } catch (e) {
      onError(e);
    }
  }

  async function handleDelete(noteId: string | undefined) {
    if (!noteId === undefined) {
      console.error("Cannot delete note without an ID");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setNotes(notes.filter((note) => note.noteId !== noteId));
      await API.del("notes", `/notes/${noteId}`, {});
    } catch (e) {
      onError(e);
    }
  }

  function renderLander() {
    return (
      <Container fluid className="lander">
        <Row>
          <Col>
            <h1>Debris</h1>
            <p className="text-muted">A simple note taking app</p>
          </Col>
        </Row>
      </Container>
    );
  }

  function renderNotes() {
    // const sortedNotes = [...notes].sort((a: NoteType, b: NoteType) => {
    //   if (a.createdAt && b.createdAt) {
    //     return b.createdAt.localeCompare(a.createdAt);
    //   }
    //   return 0;
    // });
    return (
      <Container fluid className="notes-container">
        <Row>
          <Col>
            <NewNote onNewNote={handleNewNote} />
          </Col>
        </Row>
        <Row style={{ padding: "10px 0" }}>
          <Col>
            {notes.map(({ noteId, content, createdAt }) => (
              <Row
                key={noteId}
                className="note-content"
                style={{ padding: "5px 0" }}
              >
                <Col>
                  <ListGroup key={noteId} className="note-list">
                    <ListGroup.Item>
                      <Note
                        note={{ noteId, content, createdAt }}
                        onDelete={handleDelete}
                      />
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }

  return <>{isAuthenticated ? renderNotes() : renderLander()}</>;
}
