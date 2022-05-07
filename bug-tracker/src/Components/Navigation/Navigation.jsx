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

const drawerWidth = 240;
const Navigation = ({onLogout, children}) => {
    const theme = useTheme();

    const { project } = useSelector((state) => state.project); //gets project from store
    const dispatch = useDispatch();
    const navigate = useNavigate();



  return (
    <div>
        <div style={{display: 'flex'}}>
          <AppBar color="secondary" enableColorOnDark style={{width: `calc(100% - ${drawerWidth}px`}}>
            <Toolbar>
              <div>
                <Typography className='navLink' variant="h6" component="div" onClick={() => navigate('/projects')}>My Projects</Typography>
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