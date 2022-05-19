import { Card, CardContent, Typography, Tooltip, TextField, Button, InputLabel, Select, MenuItem, FormControl, Alert, Snackbar } from '@mui/material';
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
import ReactQuill from 'react-quill';
import imageCompress from 'quill-image-compress';
import 'react-quill/dist/quill.snow.css';
import { setNav } from '../../redux/navigation';

const FeatureDetails = ({data}) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //used to determine if id is a valid uuid

    const currentUser = useSelector((state) => state.user.user);

    const [name, setName] = useState('New Feature');
    const [description, setDesc] = useState('');
    const [status, setStatus] = useState('New');

    const [sprint, setSprint] = useState({});
    const [quill, setQuill] = useState({});

    const [startFeature, setFeautre] = useState({});


    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [barOpen, setBarOpen] = useState(false); 

    useEffect(() =>{
        const onLoadCreate = async() =>{
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
                    let navRes = await SprintService.getSprintNav(id);
                    if(navRes){
                        dispatch(setNav(navRes[0]));
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
        const onLoadEdit = async() =>{
            setLoading(true);
            if(id){
                if(!regexExp.test(id)){
                    setFail(true);
                    setLoading(false);
                    return;
                }
                const res = await FeatureService.getWithParents(id);
                if(res[0]){
                    setFeautre(res[0]);
                    var res2 = await ProjectService.getProjectWithUsers(res[0].projectid); // get users to check if user is allowed.
                    if(res2[0]){
                        const users = res2[1];
                        if(!checkIfUserOnProject(currentUser, users)){ // check if user is allowed on project
                            setFail(true);
                            setLoading(true);
                            return;
                        }
                    }
                    //set data from saved stuff
                    setSprint({name: res[0].sprint_name, id: res[0].sprint_id});
                    setName(res[0].name);
                    setStatus(res[0].status);
                    setQuill(res[0].description);
                    let navRes = await FeatureService.getFeatureNav(id);
                    if(navRes){
                        dispatch(setNav(navRes[0]));
                    }
                }
            }
            setLoading(false);
        }
        if(data === 'create'){
            onLoadCreate();
        }
        if(data === 'edit'){
            onLoadEdit();
        }
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
        if(data === "create"){
            const feature = {
                name: name,
                description: quill,
                status: status,
                parentSprint: sprint.id
            }

            var res = await FeatureService.createFeature(feature);
            if(res){
                setLoading(false);
                //console.log("Success");
                navigate('/sprints/'+sprint.id);
            }
        }
        if(data === "edit"){
            if(!startFeature.id){
                return;
            }
            const feature2 ={
                id: startFeature.id,
                name: name,
                description: quill,
                status: status,
                parentSprint: sprint.id
            }
            var res2 = await FeatureService.updateFeature(feature2);
            if(res2){
                setLoading(false);
                setBarOpen(true);

            }
        }

        setLoading(false);

    }

    const updateQuill = (value) =>{
        setQuill(value);
    }
    const handleClose = (event, reason) =>{
        if (reason === 'clickaway') {
            return;
        }
        setBarOpen(false);
    }


    /*                 <div style={{display: "flex", marginBottom: 20}}>
                    <TextField value={estimated} onChange={(e) => setEstimated(e.target.value)} sx={{width: 170, mr: 2}} variant='outlined' label="Estimated Hours" type="number" />
                    <TextField value={remaining} onChange={(e) => setRemaining(e.target.value)} sx={{width: 170}} variant='outlined' label="Remaining Hours" type="number" />
                </div> */

  return (
    <div style={{padding: 20}}>
        {loading ? <Loading></Loading>: <>
            {fail ? <PageNotFound />: <>
            <Typography sx={{mb: 2}} variant='h4'>{data === 'edit' ? 'Feature Details': 'New Feature'}</Typography>
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
                <Typography>Description</Typography>
                <ReactQuill style={{marginBottom: 20}}  value={quill} onChange={updateQuill} />

                <Button variant='contained' onClick={save}>Save</Button>
                
            </div>
            <Snackbar open={barOpen} autoHideDuration={6000} anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}  onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Saved Succesfully!
                </Alert>
            </Snackbar>
            
            
            </>}
        </>}
    </div>
  )
}

export default FeatureDetails