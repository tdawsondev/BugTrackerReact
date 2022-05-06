import { ButtonGroup, Button, TextField, Typography } from '@mui/material';
import { useState, useEffect } from "react"
import ProjectService from '../../Services/ProjectService';
import Project from './Project';

const ProjectSelect = ({userId, onSelect}) => {

    const [projects, setProjects] = useState();

    useEffect(() => {
        const getProjects = async () => {
            if(userId){
            var projs = await ProjectService.getProjectsForUser(userId);
            setProjects(projs);
            console.log(JSON.stringify(projs));
            }
        }
        getProjects();
    }, [])
  
    const Default =() => {
        if(projects){
            return (<div style={{display: 'flex', padding: 20}}>
                {projects.map((project) =>
                (<Project key={project.projectid} project={project} />))}
               </div>)
        }
        else{
            return (<></>)
        }

    }


  return (
      <Default />
  )
}

export default ProjectSelect