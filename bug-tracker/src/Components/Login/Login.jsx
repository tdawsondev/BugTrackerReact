import {Button, TextField, Typography, Container, Grid, Alert } from '@mui/material';
import './Login.css';
import { useState, useEffect } from 'react'
import LoginService from '../../Services/LoginService';

const Login = ({onLogin}) => {

    const [username, setUsername] = useState('')
    const [npassword, setPassword] = useState('')
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    
    
    const onSubmit = async (e) => {
        e.preventDefault()
        let loginTry = {
            user_Name: username,
            password: npassword
        }
        let result = await LoginService.tryLogin(loginTry);
        if(result.error){
            setAlertContent(result.error)
            setAlert(true);
        }
        else{
            setAlert(false);
            localStorage.setItem('user', JSON.stringify(result));
            onLogin(result);
        }
    }

    useEffect(() =>{
      }, [])

  return (
    <form className='login-main' onSubmit={onSubmit} >
        <Typography style={{ margin: 10}} variant='h2'>Login</Typography>
        <TextField style={{ margin: 10}} label='User Name'  value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
        <TextField style={{ margin: 10}} label='Password' value={npassword} onChange={(e) => setPassword(e.target.value)}></TextField>
        <Button type='submit' style={{ width: 200, margin: 10}} variant='contained'>Login</Button>
        {alert ? <Alert severity='error'>{alertContent}</Alert> : <></>}
    </form>  
  )
}

export default Login