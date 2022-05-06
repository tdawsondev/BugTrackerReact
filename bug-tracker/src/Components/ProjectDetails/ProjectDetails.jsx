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
                console.log(JSON.stringify(proj))
                setProjectL(proj);
                dispatch(setProject(proj));

              }
            }
          
          }
      }
      getProjects();
  }, [])



  return (
    <>
    {project.id == undefined ? <Loading></Loading>: 
    <div style={{padding: 20}}>
      <h1>{id}</h1>
    </div>}
    </>
  )
}

export default ProjectDetails