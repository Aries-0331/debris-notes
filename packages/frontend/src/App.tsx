import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Links from "./Routes.tsx";
import { Container, Row, Col, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, AppContextType } from "./lib/contextLib";
import { onError } from "./lib/errorLib";

function App() {
  const nav = useNavigate();
  const [user, setUser] = useState({
    email: "",
    isAuthenticated: false,
  });
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, [user]);

  async function onLoad() {
    try {
      await Auth.currentSession();
    } catch (error) {
      if (error !== "No current user") {
        onError(error);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    setUser({ email: "", isAuthenticated: false });

    nav("/login");
  }
  return (
    !isAuthenticating && (
      <Container fluid className="app bg-light">
        <Row>
          <Col>
            <Navbar collapseOnSelect expand="md" className="mb-3 px-3">
              <LinkContainer to="/">
                <Navbar.Brand className="fw-bold text-muted">
                  Debris
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Nav activeKey={window.location.pathname}>
                  {user.isAuthenticated ? (
                    <>
                      <NavDropdown
                        title={user.email.split("@")[0]}
                        id="basic-nav-dropdown"
                      >
                        <LinkContainer to="/settings">
                          <NavDropdown.Item>Settings</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={handleLogout}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <LinkContainer to="/signup">
                        <Nav.Link>Signup</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                    </>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <AppContext.Provider
              value={
                {
                  user,
                  setUser,
                } as AppContextType
              }
            >
              <Links />
            </AppContext.Provider>
          </Col>
        </Row>
      </Container>
    )
  );
}

export default App;
