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
import FeatureService from '../../Services/FeatureService';

const CreateFeature = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //used to determine if id is a valid uuid

    const currentUser = useSelector((state) => state.user.user);

    const [name, setName] = useState('New Feature');
    const [description, setDesc] = useState('');
    const [status, setStatus] = useState('New');

    const [sprint, setSprint] = useState({});


    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const onLoad = async() =>{
            setLoading(true);
            if(id){
                if(!regexExp.test(id)){
                    setFail(true);
                    setLoading(false);
                    return;
                }
                const projSprin = await SprintService.getSprintByID(id);
                if(projSprin[0].name){
                    setSprint(projSprin[0]);
                    //console.log(JSON.stringify(result)); // --- continue from here
                    var res = await ProjectService.getProjectWithUsers(projSprin[0].project_id);
                    //console.log(JSON.stringify(res));
                    if(res[0].name){
                        const users = res[1];
                        if(!checkIfUserOnProject(currentUser, users)){
                            setFail(true);
                            setLoading(false);
                            return;
                        }
                    }
                    
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
            setLoading(false);
        }
        onLoad();
        return () => {
            setSprint({}); // fixes werid bug with memory leaks
          };
    }, []);


    const save = async() =>{
        if(name == ''){
            return;
        }
        if(!sprint.id){
          return;
        }

        setLoading(true);
        const feature = {
            name: name,
            description: description,
            status: status,
            parentSprint: sprint.id
        }

        var res = FeatureService.createFeature(feature);
        if(res){
            setLoading(false);
            //console.log("Success");
            navigate('/sprints/'+sprint.id);
        }

        setLoading(false);

    }


    /*                 <div style={{display: "flex", marginBottom: 20}}>
                    <TextField value={estimated} onChange={(e) => setEstimated(e.target.value)} sx={{width: 170, mr: 2}} variant='outlined' label="Estimated Hours" type="number" />
                    <TextField value={remaining} onChange={(e) => setRemaining(e.target.value)} sx={{width: 170}} variant='outlined' label="Remaining Hours" type="number" />
                </div> */

  return (
    <div style={{padding: 20}}>
        {loading ? <Loading></Loading>: <>
            {fail ? <PageNotFound />: <>
            <Typography sx={{mb: 2}} variant='h4'>New Feature</Typography>
            <div className='boxOutline'>
                <div style={{display: "flex", marginBottom: 20}}>
                    <TextField value={name} onChange={(e) => setName(e.target.value)} sx={{width: 300}} id="feature-name" label="Feature Name" variant='outlined' />
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
                    <TextField value={description} onChange={(e) => setDesc(e.target.value)} sx={{width: 600}} id="sprint-description" label="Description" variant='outlined' multiline rows={4} />
                </div>
                <Button variant='contained' onClick={save}>Save</Button>
            </div>
            
            
            
            
            </>}
        </>}
    </div>
  )
}

export default CreateFeature