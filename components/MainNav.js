import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";
import { useState, useEffect } from "react";

export default function MainNav() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(readToken());
  }, [router.pathname]);

  function logout() {
    removeToken();
    setToken(null);
    router.push("/login");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container>

          <Navbar.Brand as={Link} href="/">
            Param A. Bhatt / Sahil H. Patel
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          {token && (
            <Nav>
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {!token && (
            <Nav>
              <Nav.Link as={Link} href="/register">
                Register
              </Nav.Link>
            </Nav>
          )}

        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}