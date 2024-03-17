import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewNote.css";
import { Container, Row, Col } from "react-bootstrap";

import { API } from "aws-amplify";
import { NoteType } from "../types/note";
import { onError } from "../lib/errorLib";
import { s3Upload } from "../lib/awsLib";

export default function NewNote() {
  const file = useRef<null | File>(null);
  const nav = useNavigate();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function createNote(note: NoteType) {
    return API.post("notes", "/notes", {
      body: note,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current
        ? await s3Upload(file.current)
        : undefined;

      await createNote({ content, attachment });
      nav("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Row>
        <Col className="editor-content">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              value={content}
              as="textarea"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a new note"
            />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="editor-menu-bar">
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
      </Row>
    </Container>
  );
}
