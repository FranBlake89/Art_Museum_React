import styles from '@/styles/History.module.css'
import { searchHistoryAtom } from "@/store";
import { useAtom} from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { removeFromHistory } from '@/lib/userData';

export default function HistorySearch() {
    const router = useRouter();
    
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    console.log('from history.js',searchHistory)
    
    
    if (!searchHistory) return null;
    
    let parsedHistory = [];
    if(searchHistory != ''){
        searchHistory.forEach(h =>{
            let params = new URLSearchParams(h);
            let entries = params.entries();
            parsedHistory.push(Object.fromEntries(entries));
        });
        console.log('From history', parsedHistory)

    }

    const historyClicked = (event, index) =>{
        return router.push(`/artwork?${searchHistory[index]}`)
    }

    const removeHistoryClicked = async(event, index) => {
        event.stopPropagation();
        setSearchHistory (await removeFromHistory(searchHistory[index]))

    }
    //TODO:
    //- IMPROVE HISTORY DISPLAY IN SMALLS DISPLAYS 
    //- CHECK REMOVE BUTTON
    //- CHECK IN DB
    return (
        <>
        <h1>History</h1>
        {parsedHistory.length > 0 ? (
        <ListGroup>
            {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item className={styles.historyListItem} key={index}  onClick={e => historyClicked(e, index)}>
                {Object.keys(historyItem).map((key, index) => (
                <React.Fragment 
                    key={index}>
                        {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </React.Fragment>
                ))}
                <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={e => removeHistoryClicked(e, index)}>
                        &times;
                    </Button>
            </ListGroup.Item>
            ))}
        </ListGroup>
        ) : (
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