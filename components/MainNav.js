import Link from 'next/link';
import { useRouter } from 'next/router';
import { atom, useAtom } from "jotai";
import { searchHistoryAtom, userAtom } from "@/store";
import {Navbar, Nav, NavDropdown, Container, Button, Form, Row, Col} from 'react-bootstrap';
import { addToHistory } from '@/lib/userData';
import { isAuthenticated, readToken, removeToken } from '@/lib/authenticate';
import { useEffect, useState } from 'react';


export default function MainNav(){
    const router = useRouter();
    const [userState, setUserState] = useAtom(userAtom);
    const [history, setHistory]=useAtom(searchHistoryAtom);
    

    // useEffect(() => {
    //     async function set () {
    //         await setLogged(isAuthenticated())
    //         const data  = readToken();
    //         if(data){
    //             console.log(data.userName)
    //             const name = data.userName
    //             setUserName(name);
    //         }
    //         console.log(`user Name:: ${data}`)
            
    //     }
    //     set();
    //   }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const searchField = e.target.search.value;
        const setSearchField = `title=true&q=${searchField}`
        //setHistory([...history, setSearchField])
        setHistory(await addToHistory(setSearchField))
        router.push(`/artwork?${setSearchField}`);
        
    };
    //TODO:
    //- ERASE QUERY AFTER CLICK ON SEARCH BUTTON

    const handleLogout =  () =>{
        removeToken();
        setUserState({ isLoggedIn: false, userName: "" });
        router.push('/login');
    }
    

    return(
    <>
        <Navbar bg="dark" expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#">Francisco Castillo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto my-2 my-lg-0">
                    <Link href="/" passHref legacyBehavior> 
                        <Nav.Link active={router.pathname ==="/"}>Home</Nav.Link>
                    </Link>
                    {userState.isLoggedIn && (
                        <Link href="/search" passHref legacyBehavior>
                        <Nav.Link active={router.pathname === '/search'}>Advanced Search</Nav.Link>
                        </Link>
                    )}
                </Nav>
                { userState.isLoggedIn ? (
                    <Nav>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="auto">
                            <Form.Control
                                variant="outline-dark"
                                type="text"
                                name="search"
                                placeholder="Search"
                                className="mr-2"
                            />
                            </Col>
                            <Col xs="auto">
                            <Button type="submit">Search</Button>
                            </Col>
                        </Row>
                        </Form>
                        <NavDropdown title={userState.userName} id="basic-nav-dropdown">
                        <Link href="/favourites" passHref legacyBehavior>
                            <NavDropdown.Item active={router.pathname === '/favourites'}>
                            Favourites
                            </NavDropdown.Item>
                        </Link>
                        <Link href="/history" passHref legacyBehavior>
                            <NavDropdown.Item active={router.pathname === '/history'}>
                            Search history
                            </NavDropdown.Item>
                        </Link>
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    ) : (
                        <Nav>
                            <Link href="/register" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === '/register'}>Register</Nav.Link>
                            </Link>
                            <Link href="/login" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === '/login'}>Login</Nav.Link>
                            </Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            </>
        );
}