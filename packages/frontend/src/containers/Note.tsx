import "./Note.css";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import API from "aws-amplify";
import { NoteType } from "../types/note";

export default function Note({ noteId, content, createdAt }: NoteType) {
  const [isEditing, setIsEditing] = useState(false);
  function validateForm() {
    return content.length > 0;
  }

  function handleSave() {
    return API.put("notes", `/notes/${noteId}`, {
      body: { noteId, content, createdAt },
    });
  }

  function formatDate(str: undefined | string) {
    return !str ? "" : new Date(str).toLocaleString();
  }

  async function handleDelete() {
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
      await API.del("notes", `/notes/${id}`, {});
    } catch (e) {
      onError(e);
    }
  }

  function renderEditing() {
    return (
      <Container>
        <Row className="justify-content-between note-editor">
          <Col className="text-muted">{formatDate(createdAt)}</Col>
          <Col xs="auto">
            <Dropdown>
              <Dropdown.Toggle
                variant="none"
                id="dropdown-basic"
                className="bg-transparent border-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots note-bar-menu"
                  viewBox="0 0 16 16"
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
          <Col>{content}</Col>
        </Row>
      </Container>
    );
  }

  function renderSaved() {
    return (
      <Container>
        <Row>
          <Col>abc</Col>
        </Row>
      </Container>
    );
  }

  return <Container>{isEditing ? renderEditing() : renderSaved()}</Container>;
}
