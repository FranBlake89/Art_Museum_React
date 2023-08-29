import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { authenticateUser, isAuthenticated, readToken } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favoritesAtom, searchHistoryAtom, userAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';
userAtom


export default function Login (props){
    
    const [warning, setWarning] = useState('');
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    
    const [favList, setFavList] = useAtom(favoritesAtom);
    const [history, setHistory] = useAtom(searchHistoryAtom);

    const [userState, setUserState] = useAtom(userAtom);
    const router = useRouter();
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const responseAuth = await authenticateUser(user, pass);
            console.log('responseAuth', responseAuth);
            console.log('auth', responseAuth)
           
            await updateAtoms();
            const userLogged = readToken();
            console.log(`userlogged login.js ${userLogged}`);
            setUserState({
                isLoggedIn: true,
                userName: userLogged.userName 
            });
            router.push('/favourites'); // Redirect to favorites page after successful login

        } catch (error) {
            setWarning(error.message);
        }
    }

    async function updateAtoms(){
        try {
            const fav = await getFavourites();
            const hist = await getHistory();
            setFavList (fav);
            setHistory(hist);
            //router.push("/favourites");
        } catch (error) {
            console.log(error);
            setWarning(error.message);
        }
    }

    return(
        <>
        <Card bg="light">
            <Card.Body>
                <h2>Login</h2>
                Enter your login info below:
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
                    Login
                </Button>
        </Form>
        </>
    )
}