import React, {
  useEffect,
  useState
}  from 'react';

import './App.css';
import {
  Container
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Index';

const useStyles = makeStyles((theme) => ({
  loginCard: {
    width: 354,
    margin: '20px auto'
  },
  centerText: {
    textAlign: 'center',
    alignItems: 'center'
  },
  fullButton: {
    width: '100%',
    marginBottom: 20
  },
  fullInput: {
    width: '100%',
    marginBottom: 20
  },
  halfInputLeft: {
    width: '95%',
    marginBottom: '20px',
    paddingRight: '5%'
  },
  halfInputRight: {
    width: '95%',
    marginBottom: '20px',
    marginRight: '5%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    backgroundColor: '#a80000',
  },
  spacer_1: {
    marginBottom: 10,
    marginTop: 10
  },
  upload_input: {
    display: 'none'
  }
}));

function App() {
  const classes = useStyles();
  const [ session, setSession ] = useState({
    user: null,
    success: false,
    message: '',
    loading: true
  })

  useEffect(
    () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      setSession({
        ...session,
        user: user,
        loading: false
      })
    }, []);
  
  return session.loading ? <>Loading..</>: (
    (
      <div className="App">
        <Container>
          <Router>
            <Switch>
              <Route exact path='/'>
                { 
                  session.user ? (
                    <Home classes={classes} user={session.user}/>
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              </Route>
              <Route exact path='/login'>
                { 
                  session.user ? (
                    <Redirect to="/" />
                  ) : (
                    <Login classes={classes}/>
                  )
                }
              </Route>
              <Route exact path='/register'>
                { 
                  session.user ? (
                    <Redirect to="/" />
                  ) : (
                    <Register classes={classes}/>
                  )
                }
              </Route>
              {/* <Route exact path='/verify'></Route> */}
              <Route exact path='/users'></Route>
              <Route exact path='/user-profile'></Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Router>
        </Container>
      </div>
    )
  ) ;
  
}

export default App;
