import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { registerUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';




export default function Register (props){
    
    const [warning, setWarning] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');
    

    const router = useRouter();
    
    const handleSubmit = async(e) =>{
        e.preventDefault();
        //submit form 
        try {
            const responseReg = await registerUser(user, pass, pass2);
            console.log('reg success? ', responseReg)
                if(responseReg){
           
                    router.push("/login");
                }
        } catch (error) {
            setWarning(error.message);
        }
    }


    return(
        <>
        <Card bg="light">
            <Card.Body>
                <h2>Register</h2>
                Register for an account:
            </Card.Body>
        </Card>
        <br />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>User: </Form.Label>
                <Form.Control
                    type='text'
                    id='userName'
                    name='userName' 
                    onChange={e => setUser(e.target.value)}/>
            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type='password'
                    id='password'
                    name='password'
                    onChange={e => setPass(e.target.value)}/>
            </Form.Group>
            <br />
            <Form.Group>
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control
                    type='password'
                    id='password2'
                    name='password2'
                    onChange={e => setPass2(e.target.value)}/>
            </Form.Group>
            {warning && <>
                <br />
                <Alert variant = 'danger'>
                    {warning}
                </Alert>
            </>}

            <br />
            <Button
                variant='primary'
                className='pull-right'
                type='submit'>
                    Register
                </Button>
        </Form>
        </>
    )
}