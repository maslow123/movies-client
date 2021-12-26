import './App.css';
import React from 'react';
// import { Switch } from 'react-router';
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import { Movies, Home, Admin, OneMovie, Genres, OneGenre, EditMovie } from './components';

export default function App() {
  const sidebar = [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Movies',
      path: '/movies'
    },
    {
      label: 'Genres',
      path: '/genres'
    },
    {
      label: 'Add Movie',
      path: '/admin/add'
    },
    {
      label: 'Manage Catalogue',
      path: '/admin'
    }
  ];

  return (
    <Router>
      <div className="container">
        <div className="row">
          <h1 className="mt-3">
            Go Watch a Movie!
          </h1>
          <hr className="mb-3"/>

          <div className="row">
            <div className="col-md-2">
              <nav>
                <ul className="list-group">
                  {sidebar.map((item, i) => (
                    <li className="list-group-item" key={i}>
                      <Link to={item.path}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            <div className="col-md-10">
              <Switch>                
                <Route path="/movies/:id" component={OneMovie}/>
                <Route path="/movies">
                  <Movies />
                </Route>                       
                <Route path="/genre/:id" component={OneGenre}/> 

                <Route exact path="/genres">
                  <Genres />
                </Route>        
                <Route path="/admin/add" component={EditMovie}/>     
                <Route path="/admin">
                  <Admin />
                </Route>
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