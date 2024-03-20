import "./Note.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Form } from "react-bootstrap";
import { API } from "aws-amplify";
import { NoteType } from "../types/note";

interface NoteProps {
  note: NoteType;
  onDelete: (arg0: string | undefined) => void;
}

export default function Note(item: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [content, setContent] = useState(item.note.content);

  function formatDate(str: undefined | string) {
    return !str ? "" : new Date(str).toLocaleString();
  }

  function handleSave() {
    setIsEditing(false);
    return API.put("notes", `/notes/${item.note.noteId}`, {
      body: { content },
    });
  }

  function handleDelete() {
    item.onDelete(item.note.noteId);
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  function renderEditing() {
    return (
      <Form className="d-flex flex-column editor" style={{ padding: 0 }}>
        <Form.Control
          style={{
            width: "100%",
            height: "80px",
            padding: 0,
            border: "none",
            boxShadow: "none",
          }}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div
          className="d-flex justify-content-end"
          onClick={handleSave}
          style={{ backgroundColor: "white" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-floppy"
            viewBox="0 0 16 16"
          >
            <path d="M11 2H9v3h2z" />
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
          </svg>
        </div>
      </Form>
    );
  }

  function renderSaved(note: NoteType) {
    return (
      <Container className="saved-note-container">
        <Row className="justify-content-between">
          <Col className="text-muted note-bar-time">
            {formatDate(note.createdAt)}
          </Col>
          <Col className="note-bar-menu" xs="auto">
            <Dropdown
              className="note-bar-dropdown"
              show={isDropdownOpen}
              onClick={(e) => e.stopPropagation()}
            >
              <Dropdown.Toggle
                variant="none"
                id="dropdown-basic"
                className="bg-transparent border-0 note-bar-toggle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots note-svg-menu"
                  viewBox="0 0 16 16"
                  onClick={toggleDropdown}
                >
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                </svg>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setIsEditing(true)}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col className="note-content">{content}</Col>
        </Row>
      </Container>
    );
  }

  return <>{isEditing ? renderEditing() : renderSaved(item.note)}</>;
}
