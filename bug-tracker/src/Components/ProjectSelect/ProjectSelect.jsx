import { ButtonGroup, Button, TextField, Typography, Card, CardContent, Tooltip } from '@mui/material';
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setNavDefault } from '../../redux/navigation';
import { setProjectDefault } from '../../redux/project';
import ProjectService from '../../Services/ProjectService';
import Loading from '../Loading/Loading';
import Project from './Project';

const ProjectSelect = ({userId, onSelect}) => {

    const [projects, setProjects] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        const getProjects = async () => {
            if(userId){
            var projs = await ProjectService.getProjectsForUser(userId);
            setProjects(projs);
            //console.log(JSON.stringify(projs));
            }
        }
        getProjects();
        dispatch(setProjectDefault());
        dispatch(setNavDefault());
    }, [])
  
    const Default =() => {
        if(projects){
            return (<div style={{display: 'flex', padding: 20, flexWrap: 'wrap'}}>
                {projects.map((project) =>
                (<Project key={project.projectid} project={project} />))}
                <div style={{backgroundColor: '#121212', width: 150, margin: 17, height: 150, borderRadius: '6px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Link className='resetLink' to='/createproject'>
                        <Tooltip title='New Project'>
                            <div className='link'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                            </div>
                        </Tooltip>
                    </Link>
                </div>
               </div>)
        }
        else{
            return (<Loading>Loading</Loading>)
        }

    }


  return (
      <Default />
  )
}

export default ProjectSelect