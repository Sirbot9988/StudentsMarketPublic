import React, {useRef, useState} from 'react';
import {app, firestore, analytics} from '../fbb';
import firebase from 'firebase/app';
import alertify from 'alertifyjs';
import '../media/alertify.min.css';
import {soldEmail} from '../apiLinks/netlifyServerless';
import axios from 'axios';
import qs from 'qs';
function MainApp() {

  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
	const unsubscribe = firestore
      .collection("Books")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
		setBooks(data);
      });
  }, []);
  const mappedBooks = books.map(book => <BookList key={book.id} book={book} style={{textDecoration: 'none'}}/> )
  
  return (
    <div className="BookCollection">
      <h1>
        Our Books
      </h1>
      <div className="book-item-cont">
      {mappedBooks}
      </div>

    </div>
  )
}
export default MainApp;

function BookList(props) {
  const {name, email, title, id, price, sold } = props.book;
  const returnClickedBook = () =>{
    var promptMessage = "";
    promptMessage = promptMessage.concat("Would you like to buy ", title, " for: ", price, "VND?" );
    if(sold) {
      alertify.error('The selected book has already been sold');
    } else {
      alertify.prompt( title, promptMessage, 'Your Name'
      , function(evt, value) { 

        const msg = {
          bookTitle: title,
          totalSale: price,
          preHeader: "Congrats your book was sold!",
          userEm: email
        };
        console.log(msg);
        axios({
          headers: { 
              'content-type': 'application/json'
          },
          method: 'post',
          url: soldEmail,
          params: msg,
        })
      .then((response) => alertify.success('Your request was successful, please place your money for the book in the box and take the book you have bought.'))
      .catch((error) => alertify.error(error));
        // fetch(soldEmail, msg).then(response => response.json).then(jsondata => console.log(jsondata))
        firestore.collection("Books").doc(id).set({
          sold: true, 
          boughtBy: value,
        }, {merge: true,}) 
      }
      , function() { alertify.error('Cancelled') 
     
     }).set('labels', {ok: "Confirm", cancel:"Nevermind"});

    }

    // alertify.prompt(title, promptMessage.concat("Would you like to buy ", name, "'s book for: ", price, "VND?" ), "Your Name")
  


  }
  return(
    <>
      <div className="book-item">
        <button onClick={returnClickedBook}>
        <h1>{title}</h1>
        <p>{email}</p>
        <p className={sold ? "sold": "available"}>{sold ? "Sold": "Available"}</p>
        <p>{price} VND</p>
        </button>
      </div>
    </>
  )
}
