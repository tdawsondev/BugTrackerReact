import { Card, CardContent, Typography, Tooltip, TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import React, { useState } from 'react'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router";
import { setProject } from "../../redux/project";
import ProjectService from '../../Services/ProjectService';
import Loading from '../Loading/Loading';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import statusArray from '../../Services/StatusArray';
import PageNotFound from '../PageNotFound/PageNotFound';
import checkIfUserOnProject from '../../Services/UtilityFunctions';
import SprintService from '../../Services/SprintService';

const CreateSprint = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //used to determine if id is a valid uuid

  const currentUser = useSelector((state) => state.user.user);

  
  const [name, setName] = useState('New Sprint');
  const [description, setDesc] = useState('');
  const [status, setStatus] = useState('New');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [project, setProject] = useState({});

  const [fail, setFail] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const checkProject = async() =>{
      setLoading(true);
      if(id){
        if(!regexExp.test(id)){
          setFail(true);
          setLoading(false);
          return;
        }
        var res = await ProjectService.getProjectWithUsers(id);
        if(res[0].name){
          setProject(res[0]);
          const users = res[1];
          if(checkIfUserOnProject(currentUser, users)){
            //console.log(JSON.stringify(users));
          }
          else{
            setFail(true);
            setLoading(false);
            return;
          }
        }
        else{
          setFail(true);
          setLoading(false);
          return;
        }

      }
      setLoading(false);
    }
    checkProject();
    return () => {
      setProject({}); // fixes werid bug with memory leaks
    };
  }, []);


  const save = async () =>{

    if(name == ''){
        return;
    }
    if(!project.id){
      return;
    }

    setLoading(true);

    const sprint = {
        name: name,
        description: description,
        status: status,
        startDate: startDate,
        endDate: endDate,
        parentProject: project.id
    }

    var res = await SprintService.createSprint(sprint);
    if(res){
      setLoading(false);
      //console.log("Success");
      navigate('/projects/'+project.id);
    }
    
    
    setLoading(false);
}

  const onStartChange =(date) =>{
    setStartDate(date);
    if(date > endDate){ 
      setEndDate(date);
    }
  }
  const onEndChange = (date) =>{
    if(date< startDate){
      setEndDate(startDate);
      return;
    }
    setEndDate(date);
  }


  return (
    <div style={{padding: 20}}>
      {loading ? <Loading></Loading>: 
      <>
        {fail ? <PageNotFound /> : <> 
        <Typography sx={{mb: 2}} variant='h4'>Create Sprint for {project.name}</Typography>
        <div className='boxOutline'>
            <div style={{display: "flex", marginBottom: 20}}>
                <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{width: 300}} id="sprint-name" label="Sprint Name" variant='outlined' />
            </div>
            <div style={{display: "flex", marginBottom: 20}}>
                <FormControl>
                  <InputLabel id='status-label'>Status</InputLabel>
                  <Select sx={{width: 150}} labelId='status-label' id='status' value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                    {statusArray.map((val, key) => {
                      return(
                        <MenuItem key={key} value={val}>{val}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
            </div>
            <div style={{display: "flex", marginBottom: 20}}>
              <div style={{marginRight: 20}}>
                <label style={{ fontSize:'16px' }} htmlFor="startPicker">Start Date:</label><br></br>
                <DatePicker id='startPicker' className='datePicker' selected={startDate} onChange={(date) => onStartChange(date)} />
              </div>
              <div>
                <label style={{ fontSize:'16px' }} htmlFor="endPicker">End Date:</label><br></br>
                <DatePicker id='endPicker' className='datePicker' selected={endDate} onChange={(date) => onEndChange(date)} />
              </div>
            </div>
            <div style={{display: "flex", marginBottom: 20}}>
                <TextField value={description} onChange={(e) => setDesc(e.target.value)} sx={{width: 600}} id="sprint-description" label="Description" variant='outlined' multiline rows={4} />
            </div>
            <Button variant='contained' onClick={save}>Save</Button>
        </div>
        </>}
      </>}
    </div>
  )
}

export default CreateSprint