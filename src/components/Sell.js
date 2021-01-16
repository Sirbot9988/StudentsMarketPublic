import React, { Component } from 'react'
import {app, firestore, analytics} from '../fbb';
import {Form, Button} from 'react-bootstrap';
import Confirm from './Confirm';
import firebase from 'firebase';
import axios from 'axios';
import {bookListed} from '../apiLinks/netlifyServerless';
import alertify from 'alertifyjs';
export default class Sell extends Component {
    constructor(props) {
        super(props);
        this.state = {userEm: '',
    userName: '',
    userClass: '',
    userBookTitle: '',
    submitted: false,
    userPrice: 0,
    submitKeyid: ''
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.sendBooks = this.sendBooks.bind(this);
      }
    
    handleChange(event) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value,
        })
    }
    

    sendBooks = async(e) => {
        e.preventDefault();
        var submitID;
        var submitSucc = false;
        const booksRef = firestore.collection("Books");
        const {userName, userBookTitle, userClass, userEm, userPrice} = this.state
        
        if(userName && userBookTitle && userClass && userEm && userPrice) {
            // Add book to firebase DB 
            await booksRef.add({
                name: userName,
                email: userEm,
                class: userClass,
                title: userBookTitle,
                sold: false,
                price: userPrice,
                boughtBy: "",
                CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }).then(function(docRef) {
                submitID = docRef.id;
                submitSucc = true;
                
                
            }).catch(function(error) {
            console.log("There was an error contacting the DB");
            })
            this.setState({
                submitKeyid: submitID,
                submitted: true,
            })
            const msg = {
                bookTitle: userBookTitle,
                totalSale: userPrice,
                preHeader: "Congrats your book was listed successfully!",
                userEm: userEm,
                bookID: this.state.submitKeyid,
            };
            // send email to API Endpoint
            axios({
                headers: { 
                    'content-type': 'application/json'
                },
                method: 'post',
                url: bookListed,
                params: msg,
              })
            .then((response) => alertify.success('Your request was successful'))
            .catch((error) => alertify.error(error));

        }

    }

        render() {
            if(!this.state.submitted) {
            return (
                <div className="sell">
                    <Form onSubmit={this.sendBooks} className="SellForm">
                        <Form.Group controlId="formBasicBookTitle">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control type="text" placeholder="Little Red Riding Hood"  value={this.state.userBookTitle} onChange={this.handleChange} name="userBookTitle"/>
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
    
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="sangwoo23@renaissance.edu.vn" value={this.state.userEm} onChange={this.handleChange} name="userEm"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control type="text" placeholder="11W"  value={this.state.userClass} onChange={this.handleChange} name="userClass"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Sang Woo" value={this.state.userName} onChange={this.handleChange} name="userName"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Price in VND</Form.Label>
                            <Form.Control type="number" placeholder="96000" value={this.state.userPrice} onChange={this.handleChange} name="userPrice"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <p className="disclaimer">
                        Please be advised, Talktown will take a 5% commission off of your sale. <br />
                        A confirmation letter will be sent to your email, naming the details of your <br/>sale(including how much talktown will take from your sale) <br/>
                        In the next few days, a member from talktown will contact you to find you and give you your payment <br/>
                        either in lunch, break or ECA time.


                    </p>
                    </Form>

                    
                </div>
            )
            
        } else {
            return(
                <>
                    <Confirm submitID={this.state.submitKeyid}/>
                </>
            )
        }
        }


}
