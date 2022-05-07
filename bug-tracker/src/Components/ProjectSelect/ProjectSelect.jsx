import { ButtonGroup, Button, TextField, Typography } from '@mui/material';
import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux';
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
    }, [])
  
    const Default =() => {
        if(projects){
            return (<div style={{display: 'flex', padding: 20}}>
                {projects.map((project) =>
                (<Project key={project.projectid} project={project} />))}
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