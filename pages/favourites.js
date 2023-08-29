import { Row, Col, Card, Pagination, Container } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favoritesAtom } from '@/store';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
    const [favouritesList] = useAtom(favoritesAtom);
    
    //console.log(favouritesList)
    //console.log('atom', favoritesAtom )

    if (!favouritesList) {
    return null;
    }

    return (
    <>
        {favouritesList.length > 0 ? (
        <Row className="gy-4">
            {favouritesList.map((currentObjectID) => {
            return (
                <Col lg={3} key={currentObjectID}>
                <ArtworkCard objectID={currentObjectID} />
                </Col>
            );
            })}
        </Row>
        )  : (
        <Card>
            <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for something else.
            </Card.Body>
        </Card>
        )}
    </>
    );
}
