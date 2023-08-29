import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { atom, useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";


export default function AdvancedSearch() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const [history, setHistory]=useAtom(searchHistoryAtom);
    console.log('first call history',history)

    // const addSearchJotai = (querySearch) =>{
    //     setHistory([...history, querySearch])
    //     console.log('2nd call history',history)
    // }
 
    const submitForm = async (data) => {
        try{
            let queryString = "";
            // append the searchBy value
            queryString += `searchBy=${data.searchBy}`;

            if (data.geoLocation) {
                queryString += `&geoLocation=${data.geoLocation}`;
            }
            if (data.medium) {
                queryString += `&medium=${data.medium}`;
            }
            
            queryString += `&isOnView=${data.isOnView}`;
            queryString += `&isHighlight=${data.isHighlight}`;
            queryString += `&q=${data.q}`;

            //setHistory(queryString)
            // addSearchJotai(queryString)
            //const list = atom((get)=>get(history), (get, set, newSearch)=>{set(history, newSearch)})
            setHistory(await addToHistory(queryString))
        
            router.push(`/artwork?${queryString}`);
        }catch(error){
            console.log('Error in SubmitForm: ', error);
        }
    }

    return (
        <Form onSubmit={handleSubmit(submitForm)} className="mt-4">
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                    <Form.Label>Search Query</Form.Label>
                    {/*  validation */}
                    <Form.Control 
                    type="text" 
                    placeholder="" 
                    name="q" 
                    {...register("q", { required: true })} />
                    {/* use errors to check if the form control is invalid and add is-invalid class */}
                    {errors.q && <Form.Control.Feedback type="invalid">This field is required</Form.Control.Feedback>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Form.Label>Search By</Form.Label>
                    {/* register to link the form control to the useForm hook */}
                    <Form.Select 
                    name="searchBy" 
                    className="mb-3" {...register("searchBy")}>
                    <option value="title">Title</option>
                    <option value="tags">Tags</option>
                    <option value="artistOrCulture">Artist or Culture</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                    <Form.Label>Geo Location</Form.Label>
                    {/* register to link the form control to the useForm hook */}
                    <Form.Control 
                    type="text" 
                    placeholder="" 
                    name="geoLocation" {...register("geoLocation")} />
                    <Form.Text className="text-muted">
                        Case Sensitive String (ie "Europe", "France", "Paris", "China", "New York", etc.), with multiple values separated by the | operator
                    </Form.Text>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3">
                    <Form.Label>Medium</Form.Label>
                    {/* register to link the form control to the useForm hook */}
                    <Form.Control 
                    type="text" 
                    placeholder="" 
                    name="medium" {...register("medium")} />
                    <Form.Text className="text-muted">
                        Case Sensitive String (ie: "Ceramics", "Furniture", "Paintings", "Sculpture", "Textiles", etc.), with multiple values separated by the | operator
                    </Form.Text>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* register to link the form control to the useForm hook */}
                    <Form.Check
                    type="checkbox"
                    label="Highlighted"
                    name="isHighlight"
                    {...register("isHighlight")}
                    />
                    {/* register to link the form control to the useForm hook */}
                    <Form.Check
                    type="checkbox"
                    label="Currently on View"
                    name="isOnView"
                    {...register("isOnView")}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
            </Row>
        </Form>
    
    );
}