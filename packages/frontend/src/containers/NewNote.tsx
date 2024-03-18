import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./NewNote.css";
import { Container, Row, Col } from "react-bootstrap";

import { API } from "aws-amplify";
import { NoteType } from "../types/note";
import { onError } from "../lib/errorLib";
import { s3Upload } from "../lib/awsLib";

export default function NewNote() {
  const inputRef = useRef<HTMLFormElement>(null);
  const file = useRef<null | File>(null);
  const nav = useNavigate();
  const [content, setContent] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // function validateForm() {
  //   return content.length > 0;
  // }

  function createNote(note: NoteType) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }

  const handleFormClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  async function handleSubmit(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    // setIsLoading(true);

    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : undefined;

      await createNote({ content, attachment });
      nav("/");
    } catch (e) {
      onError(e);
      // setIsLoading(false);
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form
            className="d-flex flex-column form-focus-effect"
            onClick={handleFormClick}
            ref={inputRef}
          >
            <Form.Control
              style={{
                width: "100%",
                height: "80px",
                paddingTop: "5px",
                border: "none",
                boxShadow: "none",
              }}
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
        </Col>
      </Row>
      {/* <Row>
        <Col className="text-right">
          <LoaderButton
            className="btn"
            size="xs"
            type="submit"
            variant="secondary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Commit
          </LoaderButton>
        </Col>
      </Row> */}
    </Container>
  );
}
