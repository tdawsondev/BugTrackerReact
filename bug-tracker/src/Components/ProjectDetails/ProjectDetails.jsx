import { Card, CardContent, Typography, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router";
import { setProject } from "../../redux/project";
import ProjectService from '../../Services/ProjectService';
import Loading from '../Loading/Loading';

const ProjectDetails = () => {

    const { id } = useParams();
    let dispatch = useDispatch();

    const user = useSelector((state) => state.user.user);

    const [project, setProjectL] = useState({});
    const [usersW, setUsersL] = useState([]);

    useEffect(() => {
      const getProjects = async () => {
          if(id){
            var result = await ProjectService.getProjectWithUsers(id);
            if(result[0]){
              const proj = result[0];
              const users = result[1];
              var canBeOnProject = false;
              for(const userL of users){
                if(user.id == userL.uid){
                  canBeOnProject = true
                }
              }
              if(canBeOnProject){
                //console.log(JSON.stringify(proj))
                setProjectL(proj);
                setUsersL(users);
                dispatch(setProject(proj));

              }
            }
          
          }
      }
      getProjects();
  }, [])

  const saveChanges = () =>{
    console.log("Saving")
  }



  return (
    <>
    {project.id == undefined ? <Loading>Loading</Loading>: 
    <div style={{padding: 20}}>
      <div style= {{display: 'flex'}}>
      <Typography variant='h3'>{project.name}</Typography>
      <Tooltip title="Save">
        <div className='link' style={{marginLeft: 'auto', marginTop: 12}} onClick={() => saveChanges()}>
          <svg className='btn-icon' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        </div>
      </Tooltip>
      </div>
      <hr />
      <div style={{display: 'flex'}}>
        <Card sx={{ width: '65%', mt: 2}}>
          <CardContent>
            <Typography sx={{mb: 3}} variant='h4'>About this project</Typography>
            <Typography sx={{fontSize: '18px'}}>{project.description}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: '35%', mt: 2, ml: 4}}>
          <CardContent>
            <Typography sx={{mb: 3}} variant='h4'>Members</Typography>
            {usersW.map((val, key) =>{
              return (<p key={key}>{val.name}</p>)
            })}
          </CardContent>
        </Card>
      </div>
    </div>}
    </>
  )
}

export default ProjectDetails