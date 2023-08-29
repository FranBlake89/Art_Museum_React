import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favoritesAtom } from '@/store';
import { useEffect, useState } from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';




export default function ArtworkCardDetail ({ objectID }) {
  let valueShow = false

  const { data, error } = useSWR(
          objectID? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`: null 
  );

  const [favList, setFavList] = useAtom(favoritesAtom);
//checking if the current objectID is in favList
  if( favList ){
    const currentItem = favList.find(
      favList => favList === objectID
      //this return true or false
      //true -> if I found (show remove)
      //false -> if not found  (show add)
    )
    //Set the value, depending it was found or not
    valueShow = currentItem
  }

  const [showAdded, setShowAdded] = useState(valueShow);

  useEffect( () => {
    setShowAdded(favList?.includes(objectID))
  }, [favList])

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  const {
    primaryImage,
    artistDisplayName,
    creditLine,
    dimensions,
    artistWikidata_URL,
    medium,
  } = data;

  const artworkImageSrc = primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
  const artworkArtist = artistDisplayName || 'N/A';
  const artworkCreditLine = creditLine || 'N/A';
  const artworkDimensions = dimensions || 'N/A';

  const FavouritesClicked = async() => {
    
    console.log(`obj ID ${objectID}`)
    //Value=> ${objectID.value} ===> UNDEFINED
    //if the current ID is in favList Array
    if(showAdded){
      //removing from favList
      //const updatedFavList = favList.filter(fav => fav != objectID) 
      //setting the new values
      //setFavList(updatedFavList)
      setFavList(await removeFromFavourites(objectID))
      setShowAdded(!showAdded)
      return
    }
    //else: (if it is a new ID not contained in the fav List Array)
    //setFavList(prevValue => [...prevValue, objectID])
    setFavList(await addToFavourites(objectID))
    setShowAdded(!showAdded)

  };

  console.log('val showAdded', showAdded)

  return (
    <Card style={{ width: 'auto' }} className="d-inline-block">
      {primaryImage &&
        <Card.Img 
          variant="top" 
          src={artworkImageSrc}
          alt={artworkArtist}
          />
      }
      <Card.Body>
        <Card.Title>{artworkArtist}</Card.Title>
        <Card.Text>
          Medium: {medium}
          <br />
          <br />
          Artist: {artworkArtist}
          <br />
          Credit Line: {artworkCreditLine}
          <br />
          Dimensions: {artworkDimensions}
          <br />
          {artistWikidata_URL && (
            <>
              <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                wiki
              </a>
              <br />
            </>
          )}
        </Card.Text>
        
        <Button variant="primary" onClick={FavouritesClicked}>
          {!showAdded ? 'Add to Favourites' : 'Remove from Favourites'}
        </Button>
      </Card.Body>
    </Card>
  );
}