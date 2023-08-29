/*
++++++++++++++++++++++++++++++++
Name: Francisco Castillo
Course: WEB'422'

Notes: 
Assignment 6
Init Project    : npm run dev 

Version:
1.0 - solved bugs to display favourites arts.
1.1 - added new functionalities
1.2 - added authentication
1.3 - added connection with API, create user, read from API

TODO:
- start with auth functionalities (A6)
- Check TODO on:  
      1. MainNav component
      2. History page
- Create LogOut button
- Add Name on MainNav
- Handle when I tried to go to pages without LogIn ( show message or just redirect to LogIn )
- Check delete function and remove (history list and favourite list)
++++++++++++++++++++++++++++++++
*/

import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import { Provider } from 'jotai';
import RouteGuard from '@/components/RouteGuard';


export default function App({ Component, pageProps }) {
  useEffect(() =>{
    import("bootstrap/dist/js/bootstrap"); //add bootstrap js library
  }, [] )
  
  return(
      <SWRConfig value={{ 
          fetcher:
          async url => {
            const res = await fetch(url)
            if (!res.ok) {
              const error = new Error('An error occurred while fetching the data. Check _app.js')
              // Attach extra info to the error object.
              error.info = await res.json()
              error.status = res.status
              throw error
            }
            return res.json()
          }    
        }}
      >
        <Provider>
          <RouteGuard>
            <Layout>
              <Component {...pageProps} /> 
            </Layout>
          </RouteGuard>
        </Provider>
      </SWRConfig>
  )
}
