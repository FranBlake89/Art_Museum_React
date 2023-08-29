import useSWR from 'swr';
import { Col, Row, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard ({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
  } = data;

  const imageSrc = primaryImageSmall ||  'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
  const artworkTitle = title || 'N/A';
  const artworkDate = objectDate || 'N/A';
  const artworkClassification = classification || 'N/A';
  const artworkMedium = medium || 'N/A';
  return (
    <Card>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{artworkTitle}</Card.Title>
        <Card.Text>
          Date: {artworkDate}
          <br />
          Classification: {artworkClassification}
          <br />
          Medium: {artworkMedium}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">View Details ({objectID})</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};


