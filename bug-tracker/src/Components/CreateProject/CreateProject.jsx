import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import ProjectService from '../../Services/ProjectService'
import Loading from '../Loading/Loading';

const CreateProject = () => {

    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user); //gets user from state store

    const [name, setName] = useState('');
    const [description, setDesc] = useState('');

    const [loading, setLoading] = useState(false);

    const save = async () =>{

        if(name == ''){
            return;
        }
        if(description == ''){
            return;
        }

        setLoading(true);
        const project = {
            name: name,
            description: description,
            created_By_Id: user.id
        }
        let res = await ProjectService.createProject(project);
        if(res){
            setLoading(false);
            console.log("Success");
            navigate('/projects');
        }
        setLoading(false);

    }

  return (
    <div style={{padding: 20}}>
        {!loading ? 
        <>
            <Typography sx={{mb: 5}} variant='h3'>Create Project</Typography>
            <div className='boxOutline'>
                <div style={{display: "flex", marginBottom: 20}}>
                    <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{width: 300}} id="project-name" label="Project Name" variant='outlined' />
                </div>
                <div style={{display: "flex", marginBottom: 20}}>
                    <TextField value={description} onChange={(e) => setDesc(e.target.value)} sx={{width: 600}} id="project-description" label="Description" variant='outlined' multiline rows={4} />
                </div>
                <Button variant='contained' onClick={save}>Save</Button>
            </div>
        </> 
        : <Loading>Loading</Loading>}
        
    </div>
  )
}

export default CreateProject