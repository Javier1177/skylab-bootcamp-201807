import React, {Component} from 'react'
import NavBar  from "./NavBar";
import Landing from "./Landing";

class UserProfile extends Component{

    state ={
        Username:"",
        password:"",
        newUsername: this.props.Username,
        newPassword:null,
       

        

    }
    keepNewUsername = event => this.setState({ newUsername: event.target.value })
    keepNewPassword = event => this.setState({ newPassword: event.target.value })
    
    onUpdate = event => {
        event.preventDefault()

        const { newUsername, password, newPassword } = this.state

        this.props.onUpdate(password, newUsername, newPassword)
    }

    render(){
        return <section>
        <h2>Profile</h2>
        <img src={require('../imagenes/logo-steam.png')} width="100vw" height="100vh" />

        <form onSubmit={this.onUpdate}> 
            <label>User name: </label>
            <input type="text" placeholder="Username" onChange={this.keepUsername} value={this.state.newUsername} /><br />
            <label>Current password: </label>
            <input type="password" onChange={this.keepPassword}/><br />
            <label>New password (optional): </label>
            <input type="password" onChange={this.keepNewPassword} /><br />
            <button type="submit">Update</button>
        </form>
        
     </section>
    }
}

export default UserProfile;