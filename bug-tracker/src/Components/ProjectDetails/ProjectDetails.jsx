import { Card, CardContent, Typography, Tooltip, Button } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router";
import { setNav } from '../../redux/navigation';
import { setProject } from "../../redux/project";
import ProjectService from '../../Services/ProjectService';
import checkIfUserOnProject from '../../Services/UtilityFunctions';
import Loading from '../Loading/Loading';
import PageNotFound from '../PageNotFound/PageNotFound';

const ProjectDetails = () => {

    const { id } = useParams();
    let dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user.user);

    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);

    const [project, setProjectL] = useState({});
    const [usersW, setUsersL] = useState([]);
    const [sprints, setSprints] = useState([]);


    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //used to determine if id is a valid uuid

    useEffect(() => {
      const getProjectDetails = async () => {
          setLoading(true);
          if(!regexExp.test(id)){
            setFail(true);
            setLoading(false);
            return;
          }
          if(id){
            var result = await ProjectService.getProjectWithUsers(id);
            if(result[0].name){ //check if result is valid
              const proj = result[0];
              const users = result[1];
              if(checkIfUserOnProject(user, users)){
                //console.log(JSON.stringify(proj))
                setProjectL(proj);
                setUsersL(users);
                dispatch(setProject(proj));
                var navRes = await ProjectService.getProjectNav(id);
                if(navRes){
                  dispatch(setNav(navRes[0]));
                }

                //get Sprints for current project
                var res2 = await ProjectService.getSprints(proj.id);
                if(res2[0]){
                 // console.log(JSON.stringify(res2))
                  setSprints(res2);
                }
                setLoading(false);
              }
              else{
                setFail(true);
                setLoading(false);
              }
            }
            else{
              setFail(true);
              setLoading(false);
            }
          
          }
      }

      getProjectDetails();

      return () => {
        setUsersL([]); // fixes werid bug with memory leaks
      };
  }, [])

  const saveChanges = () =>{
    console.log("Saving")
  }

  const formatedDates = (start, end) =>{
    return formatDate(start)+ " - "+formatDate(end);
  }

  const formatDate = (date) =>{
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today =  mm + '/' + dd + '/' +yyyy ;
    return today;
}

/*<TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sprints.map((val, key) => { return(
              <TableRow>
                <TableCell>{val.name}</TableCell>
                <TableCell>{val.description}</TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </TableContainer> */

  return (
    <>
    {!fail ? <>
    {loading ? <Loading>Loading</Loading>: 
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
      <div style= {{display: 'flex', marginTop: '20px'}}>
        <Typography variant='h3'>Current Sprints</Typography>
          <Tooltip title="Create New Sprint">
            <div className='link' style={{marginLeft: 'auto', marginTop: 12}} onClick={() => navigate('/createsprint/'+project.id)}>
              <svg className='btn-icon' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
            </div>
          </Tooltip>
      </div>
      <hr />
      <div style={{width: '95%', margin: 'auto', mt: 3}}>
        <div style={{display: 'flex', alignItems: 'end'}}>
        <Typography sx={{width: '15%', color: '#a8a8a8'}}>Name</Typography>
        <Typography sx={{width: '34%', color: '#a8a8a8'}} >Description</Typography>
        <Typography sx={{width: '25%', color: '#a8a8a8'}} >Dates</Typography>
        <Typography sx={{width: '25%', color: '#a8a8a8'}} >Status</Typography>

        </div>
      </div>
      {!sprints[0] ? <Typography sx={{mt: 2, textAlign: 'center'}} variant='h5'>No sprints to display.</Typography> : <>
      {sprints.map((val, key) => { 
        if(val.status === 'Closed'){
          return;
        }
        
      return(
      <Card key={key} sx={{width: '95%', margin: 'auto', mb: 3}}>
        <CardContent sx={{display: 'flex', alignItems: 'center'}}>
          <Typography sx={{width: '15%'}} variant='h5'>{val.name}</Typography>
          <Typography sx={{width: '35%', color: '#a8a8a8'}} >{val.description}</Typography>
          <Typography sx={{width: '25%', color: '#a8a8a8'}} >{formatedDates(val.start_date, val.end_date)}</Typography>
          <Typography sx={{width: '20%', color: '#a8a8a8'}} >{val.status}</Typography>
          <Button sx={{paddingBottom: 0}} onClick={() => navigate('/sprints/'+val.id)}>View</Button>
        </CardContent>
      </Card>
      )})} </>}
    </div>} </> : <PageNotFound/> }
    </>
  )
}

export default ProjectDetails