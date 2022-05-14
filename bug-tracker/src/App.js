import logo from './logo.svg';
import './App.css';
import SprintService from './Services/SprintService';
import { useState, userEffect, useEffect } from "react"
import * as React from 'react';
import ReactDOM from 'react-dom';
import { ButtonGroup, Button, TextField, Typography, AppBar } from '@mui/material';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import Login from './Components/Login/Login';
import { blue, green, purple } from '@mui/material/colors';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import Navigation from './Components/Navigation/Navigation';
import ProjectSelect from './Components/ProjectSelect/ProjectSelect';
import ProjectDetails from './Components/ProjectDetails/ProjectDetails';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userSlice';
import CreateProject from './Components/CreateProject/CreateProject';
import CreateSprint from './Components/CreateSprint/CreateSprint';
import SprintDetails from './Components/SprintDetails/SprintDetails';
import CreateFeature from './Components/CreateFeature/CreateFeature';

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
      primary: blue,
      secondary: {
        main: purple[800],
      },
  },
  components: {
    MuiDrawer:{
      styleOverrides:{
        paper:{
          width: 240,
          backgroundColor: '#272727',
          padding: 5
        }
      }
    },
  }
});

function App() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const setLogin = (login) =>{
    setUsername(login.user_name);
    setUserId(login.id);
    dispatch(setUser(login));
    navigate('/projects');
  }

  const logout = () =>{
    setUsername('');
    setUserId('');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const isLoggedIn = () => {
    const loggedInUser = localStorage.getItem('user');
    if(loggedInUser){
      return true;
    }
    return false;
  }

  useEffect(() =>{
    const loggedInUser = localStorage.getItem('user');
    if(loggedInUser){
      var object = JSON.parse(loggedInUser);
      setUsername(object.user_name);
      setUserId(object.id);
      dispatch(setUser(object));
      
    }

  }, [])



  const DefualtContainer = () => (
    <Navigation onLogout={logout}>
      <Routes>
        <Route path='/login' element={<Login onLogin={setLogin} />} />
        <Route path='/projects' element= {<ProjectSelect userId={userId} />} />
        <Route path='/projects/:id' element ={<ProjectDetails/>} />
        <Route path='/sprints/:id' element ={<SprintDetails/>} />
        <Route path='/createproject' element ={<CreateProject/>} />
        <Route path='/createsprint/:id' element={<CreateSprint/>} />
        <Route path='/addfeature/:id' element={<CreateFeature/>} />
        <Route path='*' element={<Navigate to='/projects'/>}/>
      </Routes>
    </Navigation>
  )
  const LoginContainer = () => (
    <Routes>
        <Route path='/login' element={<Login onLogin={setLogin} />} />
        <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <>
            {isLoggedIn() ? <DefualtContainer /> : <LoginContainer />}
          </>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
  
}

export default App;
