import React, { Component } from 'react'

export default class Confirm extends Component {
    constructor(props) {
        super(props);
        this.props = props
    }

    render() {
        return (
            <div className="confirmation-page">
                <h1>Congratulations your book has been listed!</h1>
                <p>You may now close this tab, an email will be sent to your specified email address with a confirmation of your listing and 
                    your listing id. <br/>
                    When your book is sold, a member from talktown will reach you in either form time, break time or lunch time. Please show them your ID to confirm you are the seller of the book. <br />
                    Do NOT share your ID to anyone you dont trust! 
                </p>
            </div>
        )
    }
}
