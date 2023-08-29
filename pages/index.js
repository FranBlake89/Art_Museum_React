/*
++++++++++++++++++++++++++++++++
Name: Francisco Castillo
Course: WEB'422'

Notes: 
Init Project    : npm run dev 

Version:
1.0 - solved bugs to display favourites arts and history search.
1.1 - add new functionalities

++++++++++++++++++++++++++++++++
*/
import Head from 'next/head';
import Image from 'next/image';
import { Row, Col } from 'react-bootstrap';
//import { Image } from 'react-bootstrap';

export default function Home() {
  return (
    <>
      <Head>
        <title>Metropolitan Museum of Art - NYC</title>
        <meta name="description" content="The Metropolitan Museum of Art of New York City" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Image 
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" 
        alt="Museum background"
        width={1200}
        height={800}
        className="img-fluid rounded"
        loading="lazy" 
      />
      <Row className="my-4">
        <Col md={6}>
          <p>
          The Metropolitan Museum of Art of New York City, colloquially "the Met", is the largest art museum in the Americas. 
          Its permanent collection contains over two million works, divided among 17 curatorial departments. The main building 
          at 1000 Fifth Avenue, along the Museum Mile on the eastern edge of Central Park on Manhattan's Upper East Side, is by 
          area one of the world's largest art museums. A much smaller second location, The Cloisters at Fort Tryon Park in Upper 
          Manhattan, contains an extensive collection of art, architecture, and artifacts from medieval Europe.
          </p>
          <p>
          The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. 
          The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures 
          from nearly all the European masters, and an extensive collection of American and modern art. The Met maintains extensive holdings 
          of African, Asian, Oceanian, Byzantine, and Islamic art. The museum is home to encyclopedic collections of musical instruments, 
          costumes, and accessories, as well as antique weapons and armor from around the world. Several notable interiors, ranging from 
          1st-century Rome through modern American design, are installed in its galleries.
          </p>
          
        </Col>
        <Col md={6}>
        <p>
            The Fifth Avenue building opened on March 30, 1880. In 2021, despite the COVID-19 pandemic in New York City, 
            the museum attracted 1,958,000 visitors, ranking fourth on the list of most-visited art museums in the world.

          </p>
          <p>
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Learn more about the Metropolitan Museum of Art</a>
          </p>
         
        </Col>
      </Row>
    </>
  );
}
