import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Movies, Home, Admin, OneMovie, Genres, OneGenre, EditMovie, Login } from './components';
import GraphQL from './components/GraphQL';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: ''
    };

    this.handleJWTChange(this.handleJWTChange.bind(this));
  };

  componentDidMount() {
    const t = window.localStorage.getItem('jwt');
    if (t && this.state.jwt === '') {
      this.setState({ jwt: JSON.parse(t) });      
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({ jwt });
  };

  logout = () => {
    this.setState({ jwt: '' });
    window.localStorage.removeItem('jwt');
  };

  render() {
    let loginLink;
    if (this.state.jwt === '') {
      loginLink = <Link to="/login">Login</Link>
    } else {
      loginLink = <Link to="/logout" onClick={this.logout}>Logout</Link>
    }
    const sidebar = [
      {
        label: 'Home',
        path: '/',
        authorized: false
      },
      {
        label: 'Movies',
        path: '/movies',
        authorized: false
      },
      {
        label: 'Genres',
        path: '/genres',
        authorized: false
      },
      {
        label: 'Add Movie',
        path: '/admin/movie/0',
        authorized: this.state.jwt ? false : true
      },
      {
        label: 'Manage Catalogue',
        path: '/admin',
        authorized: this.state.jwt ? false : true
      },
      {
        label: 'GraphQL',
        path: '/graphql',
        authorized: false
      }
    ];
  
    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="row">
              <h1 className="col mt-3">
                Go Watch a Movie!
              </h1>
              <div className="col mt-3 text-end">
                {loginLink}
              </div>
            </div>
            <hr className="mb-3"/>
  
            <div className="row">              
              <div className="col-md-2">
                <nav>
                  <ul className="list-group">
                    {sidebar.filter(item => !item.authorized).map((item, i) => (
                      <li className="list-group-item" key={i}>
                        <Link to={item.path}>{item.label}</Link>
                      </li>                      
                    ))}
                  </ul>
                  <pre>
                    {JSON.stringify(this.state, null, 3)}
                  </pre>
                </nav>
              </div>
              
              <div className="col-md-10">
                <Switch>                
                  <Route path="/movies/:id" component={OneMovie}/>
                  <Route path="/movies">
                    <Movies />
                  </Route>                       
                  <Route path="/genre/:id" component={OneGenre}/> 
  
                  <Route path="/genres">
                    <Genres />
                  </Route>   
                  <Route path="/graphql">
                    <GraphQL />
                  </Route>       
  
                  <Route 
                    path="/admin/movie/:id" 
                    component={(props) => (
                      <EditMovie {...props} jwt={this.state.jwt}/>
                    )}
                  />     
                  <Route path="/admin">
                    <Admin />
                  </Route>
                  <Route 
                    exact 
                    path="/login" 
                    component={(props) => <Login {...props} handleJWTChange={this.handleJWTChange}/>}
                  />
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}