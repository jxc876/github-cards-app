import './App.css';

// 3rd party
import axios from 'axios';
import React from 'react';

// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => (
	<div>
  	{props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
	</div>
);

class Card extends React.Component {
	render() {
  	const profile = this.props;
  	return (
    	<div className="github-profile">
    	  <img src={profile.avatar_url} alt="github profile" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    	</div>
    );
  }
}

class Form extends React.Component {
	state = { userName: '' };
	handleSubmit = async (event) => {
  	event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };
	render() {
  	return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            value={this.state.userName}
            onChange={event => this.setState({ userName: event.target.value })}
            placeholder="GitHub username" 
            required 
          />
          <button>Add card</button>
        </form>
        <section>
          ex: gaearon, sophiebits, sebmarkbage, bvaughn, jxc876
        </section>
      </>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
  	this.setState(prevState => ({
    	profiles: [...prevState.profiles, profileData],
    }));
  };
	render() {
  	return (
    	<div>
    	  <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
    	</div>
    );
  }	
}

export default App;
