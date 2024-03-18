import { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Dropdown } from "react-bootstrap";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import { NoteType } from "../types/note";
import NewNote from "./NewNote.tsx";
import Note from "./Note.tsx";
import "./Home.css";

import { API } from "aws-amplify";

export default function Home() {
  const [notes, setNotes] = useState<Array<NoteType>>([]);
  const [isLoading, setIsLoading] = useState(true);
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

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes", {});
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
    return (
      <Container fluid>
        <Row>
          <Col>
            <NewNote />
          </Col>
        </Row>
        <Row style={{ padding: "10px 0" }}>
          <Col>
            {notes.map(({ noteId, content, createdAt }) => (
              <Row className="note-content" style={{ padding: "5px 0" }}>
                <Col>
                  <ListGroup key={noteId} className="note-list">
                    <ListGroup.Item
                      action
                      className="text-nowrap text-truncate"
                    >
                      <Note
                        noteId={noteId}
                        content={content}
                        createdAt={createdAt}
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

  return (
    <Container fluid>
      {isAuthenticated ? renderNotes() : renderLander()}
    </Container>
  );
}
