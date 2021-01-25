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
    paddingLeft: '5%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container>
        <Router>
          <Switch>
            <Route exact path='/'></Route>
            <Route exact path='/login'>
              <Login classes={classes}/>
            </Route>
            <Route exact path='/register'>
              <Register classes={classes}/>
            </Route>
            <Route exact path='/signup'></Route>
            <Route exact path='/verify'></Route>
            <Route exact path='/users'></Route>
            <Route exact path='/user-profile'></Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
