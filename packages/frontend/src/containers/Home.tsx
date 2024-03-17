import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Collapse,
} from "react-bootstrap";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import { NoteType } from "../types/note";
import NewNote from "./NewNote.tsx";
import SideBar from "./SideBar.tsx";
import "./Home.css";

import { API } from "aws-amplify";

import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [open, setOpen] = useState(false);
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

  function formatDate(str: undefined | string) {
    return !str ? "" : new Date(str).toLocaleString();
  }

  function renderNotesList(notes: NoteType[]) {
    return (
      <Container fluid>
        {notes.map(({ noteId, content, createdAt }) => (
          <Row style={{ padding: "5px 0" }}>
            <Col>
              <LinkContainer
                key={noteId}
                to={`/notes/${noteId}`}
                style={{ border: "none", borderRadius: "10px" }}
              >
                <ListGroup.Item action className="text-nowrap text-truncate">
                  <span className="text-muted note-item note-date">
                    {formatDate(createdAt)}
                  </span>
                  <br />
                  <span>{content}</span>
                </ListGroup.Item>
              </LinkContainer>
            </Col>
          </Row>
        ))}
      </Container>
    );
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
            <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
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
