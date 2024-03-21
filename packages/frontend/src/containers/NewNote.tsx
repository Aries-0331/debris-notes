import { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./NewNote.css";
import { Container, Row } from "react-bootstrap";

interface NewNoteProps {
  onNewNote: (arg0: string) => void;
}

export default function NewNote(props: NewNoteProps) {
  const inputRef = useRef<HTMLFormElement>(null);
  const [content, setContent] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("80px");

  const handleFormClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  function handleSubmit(event: React.FormEvent) {
    if (content.length > 0) {
      event.preventDefault();
      props.onNewNote(content);
      setContent("");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        event.preventDefault();
        const cursorPosition = event.currentTarget.selectionStart;
        const contentBeforeCursor = content.slice(0, cursorPosition);
        const contentAfterCursor = content.slice(cursorPosition);
        setContent(contentBeforeCursor + "\n" + contentAfterCursor);
      } else {
        event.preventDefault();
        handleSubmit(event);
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      const scrollHeight = inputRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, 150) + "px";
      setTextareaHeight(newHeight);
    }
  }, [content]);

  return (
    <Container>
      <Row>
        <Form
          className="d-flex flex-column form-focus-effect editor"
          onClick={handleFormClick}
          ref={inputRef}
        >
          <Form.Control
            as="textarea"
            style={{
              width: "100%",
              height: textareaHeight,
              paddingTop: "5px",
              border: "none",
              boxShadow: "none",
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a new note"
          />
          <div
            className="d-flex justify-content-end"
            onClick={handleSubmit}
            style={{ backgroundColor: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-send"
              viewBox="0 0 16 16"
              style={{
                transform: "rotate(45deg)",
                marginRight: "20px",
                marginBottom: "10px",
              }}
            >
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
            </svg>
          </div>
        </Form>
      </Row>
    </Container>
  );
}
