import React from "react";

class Team extends React.Component  {
    constructor(props){
        super(props);

        this.state={
            userInfo:{
                name:"Dummy",
                location:"Default",
                avatar_url:"https://picsum.photos/200"
            }
        };
    }

    async componentDidMount(){

        const data = await fetch("https://api.github.com/users/anshttg");
        const json = await data.json();

        this.setState({
            userInfo:json,
        });

        console.log(json);
    }

    render(){
        const {name, location, login, avatar_url} = this.state.userInfo;

        return (
            <div className="user-card">
                
                <h2>Name:{name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: {login}</h4>
                <h5>============<img style={{width: 20, height:25}}src={avatar_url}/>============</h5>
            </div>
        );
    }
}

export default Team;