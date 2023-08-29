import MainNav from "./MainNav";
import { Container } from 'react-bootstrap';
import {Row} from 'react-bootstrap';
export default function Layout({children}){
    return (
        <>
            <MainNav />
            <br />
            <Container>
                <Row >
                    {children}

                </Row>
            </Container>
            <br />
        </>
    )
}