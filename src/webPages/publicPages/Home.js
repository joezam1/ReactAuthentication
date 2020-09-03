import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import httpMethods from '../../httpRequests/Methods.js';
import serverConfig from '../../configuration/ServerConfig.js';
import inputCommon from '../../library/InputCommon.js';
import Logger from '../../modules/data.recording/Logger';

const url = serverConfig.url;
const booksPath = '/api/books';
const urlBooksPath = url+booksPath;


export default function Home(){
    const [messageFetched, setMessageFetched] = useState(false);
    const [booksFetched, setBooksFetched] = useState(null);
    const [serverResponse, setServerResponse] = useState();
    const abortController = new AbortController();
           
    function cleanupFetch(){
        abortController.abort();
    }

    function setServerResponseCallback(response){
        var message = 'not Connected'
        if(inputCommon.isValid(response)){
            setMessageFetched(true);
            message = response.message;
        }
        setServerResponse(message);
    }

    function getAllBooksResponseCallback(response){
        if(inputCommon.isValid(response)){            
            var allBooks = response.result;
            setBooksFetched(allBooks);          
        }
    }

    function allFetchedBooks(){
        Logger.resolveLog('booksFetched',booksFetched);
        return booksFetched.map(function(item, i){
            return <li key={i}> {item.author} - {item.country} - {item.language} - {item.pages} - {item.title} - {item.year} </li>
        })
    }

    useEffect(() => {
        Logger.resolveLog('Component mounted');
        httpMethods.getMethod(url,setServerResponseCallback)
        httpMethods.getMethod(urlBooksPath,getAllBooksResponseCallback)
        return cleanupFetch();
      }, []);
    
      var serverConnectionEstablished = (messageFetched)? (<p>Connection Established: {serverResponse}</p>):(<p>Wait...</p>);
      var displayBooks = (inputCommon.isValid(booksFetched)) ? allFetchedBooks() : "Loading...";
      return(
        <div>
            <p>Home - public page</p>
            {serverConnectionEstablished}
            <ul>
                <li><Link to='/auth/login'>Login</Link></li>
                <li><Link to='/auth/signup'>Signup</Link></li>
            </ul>
            <div>
                <p>Our latest Books in Store Now</p>
                <p>Author - Country - Language - Pages - Title - Year</p>
                <ul>{displayBooks}</ul>
            </div>
        </div>
    )
}