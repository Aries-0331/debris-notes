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
      <>
        {notes.map(({ noteId, content, createdAt }) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action className="text-nowrap text-truncate">
              <span className="fw-bold">{content.trim().split("\n")[0]}</span>
              <br />
              <span className="text-muted">
                Created: {formatDate(createdAt)}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <Container className="lander">
        <Col>
          <h1>Debris</h1>
          <p className="text-muted">A simple note taking app</p>
        </Col>
      </Container>
    );
  }

  function renderNotes() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <SideBar />
          </Col>
          <Col xs={12} md={8}>
            <Row>
              <NewNote />
            </Row>
            <Row>
              <div>
                <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }

  return <div>{isAuthenticated ? renderNotes() : renderLander()}</div>;
}
