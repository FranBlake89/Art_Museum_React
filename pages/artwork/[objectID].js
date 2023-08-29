import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Button, Row } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';
import Error from 'next/error';

export default function ArtworkDetail () {
    const router = useRouter();
    const { objectID } = router.query;
  
    const { data, error } = useSWR(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
      async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('An error occurred while fetching the data.');
        }
        const data = await response.json();
        //console.log(data);
        return data;
      }
    );
  
    if (error) {
      return <Error statusCode={404} />;
    }
  
    if (!data) {
      return <div>Loading...</div>;
    }

  return (
    <>
      <h1>Artwork Detail</h1>
      <ArtworkCardDetail objectID={objectID} />

      <Row className='mt-4'>
        <Button style={{ width: 'auto' }} variant="secondary" onClick={() => router.back()}>
          Go Back
        </Button>

      </Row>
    </>
  );
};

