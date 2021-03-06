import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Divider } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const drawerWidth = 240;
const Navigation = ({onLogout, children}) => {
    const theme = useTheme();

    const { project } = useSelector((state) => state.project); //gets project from store
    const { nav } = useSelector((state) => state.nav);
    const dispatch = useDispatch();
    const navigate = useNavigate();



  return (
    <div>
        <div style={{display: 'flex'}}>
          <AppBar color="secondary" enableColorOnDark style={{width: `calc(100% - ${drawerWidth}px`}}>
            <Toolbar>
              <div style={{display: 'flex'}}>
                <Link className='resetLink' to='/projects'>
                <Typography className='navLink' variant="h6" component="div" >My Projects</Typography>
                </Link>
                {nav.project_name && <>
                  <Typography  variant="h6" sx={{ml: 1, mr: 1}}>{"->"}</Typography>
                  <Link className='resetLink' to={'/projects/'+nav.project_id}>
                  <Typography className='navLink' variant="h6" component="div" >{nav.project_name}</Typography>
                  </Link>
                </>}
                {nav.sprint_name && <>
                  <Typography  variant="h6" sx={{ml: 1, mr: 1}}>{"->"}</Typography>
                  <Link className='resetLink' to={'/sprints/'+nav.sprint_id}>
                  <Typography className='navLink' variant="h6" component="div" >{nav.sprint_name}</Typography>
                  </Link>
                </>}
                {nav.feature_name && <>
                  <Typography  variant="h6" sx={{ml: 1, mr: 1}}>{"->"}</Typography>
                  <Link className='resetLink' to={'/editfeature/'+nav.feature_id}>
                  <Typography className='navLink' variant="h6" component="div" >{nav.feature_name}</Typography>
                  </Link>
                </>}
              </div>
              <Button sx={{marginLeft: 'auto'}} color='inherit' onClick={onLogout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <Drawer
                style={{width: drawerWidth, padding: 10}}
                variant="permanent"
                anchor="left"
                >
            <Typography sx={{margin: 1}}variant='h4'>Kong Tracker</Typography>
            <Divider />
            <div style={{display: 'flex'}}>
              <div style={{margin: 'auto'}}>
                {project.name != 'null' && 
                <>
                  <p style={{textAlign: 'center'}} ></p>
                  <p style={{textAlign: 'center'}}>hi</p>
                </>
              }
              </div>


            </div>
            
          </Drawer>
          <div style={{width: '100%', }}>
            <div style={{height: theme.mixins.toolbar.minHeight}}></div>
            {children}
          </div>
       </div>
      
    </div>
  )
}

export default Navigation