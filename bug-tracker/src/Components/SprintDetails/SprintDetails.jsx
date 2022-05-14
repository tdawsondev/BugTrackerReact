import { useNavigate, useParams } from 'react-router'
import React, { useRef, useState } from 'react'
import { useEffect } from "react"
import SprintService from '../../Services/SprintService';
import { Button, Card, CardContent, Tooltip, Typography } from '@mui/material';
import Loading from '../Loading/Loading';
import PageNotFound from '../PageNotFound/PageNotFound';
import FeatureTableFeature from './FeatureTableFeature';

const SprintDetails = () => {

    const { id } = useParams();
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //used to determine if id is a valid uuid
    const navigate = useNavigate();

    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sprint, setSprint] = useState({});
    const [tree, setTree] = useState([]);

    const featureTable = useRef(null);

    

    useEffect(() =>{
      const getSprintDetails= async () =>{
        setLoading(true);
        if(id){
        if(!regexExp.test(id)){
            setFail(true);
            setLoading(false);
            return;
        }
        var result = await SprintService.getSprintByID(id);
        
        if(result[0].name){
          setSprint(result[0]);
          //console.log(JSON.stringify(result)); // --- continue from here
        }
        else{
          setFail(true);
          setLoading(false);
          return;
        }

        var res2 = await SprintService.getTree(id);

        if(res2[0]){
          //console.log(JSON.stringify(res2));
          setTree(res2);
        }
        


      }

        setLoading(false);
    }
    getSprintDetails();

    function handleResize(){
      setFeatureTableHeight();
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      setSprint({}); // fixes werid bug with memory leaks
      setTree([]);
    };
    }, []);

    const getFormatedDates =(start, end) =>{
      let x = start.toLocaleString('default', {month: 'long', day: 'numeric'});
      let y = end.toLocaleString('default', {month: 'long', day: 'numeric'});

      return x + " - "+ y;
    }

    const setFeatureTableHeight  = () =>{

    }



  return (
    <div style={{padding: 20, height: 'calc(100vh - 64px)'}}>
      {loading ? <Loading>Loading</Loading>:
      <>
      {fail ? <PageNotFound/> :
        <div id="woa" style={{}} >
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Typography variant='h3'>{sprint.project_name +" "}-{" " + sprint.name}</Typography>
            <Typography sx={{ml: 'auto'}} variant='h5'>{getFormatedDates(new Date(sprint.start_date), new Date(sprint.end_date))}</Typography>
          </div>
          <hr/>
          <div style={{display: 'flex'}}>
            <Card sx={{ width: '100%', mt: 2, mb: 2}}>
              <CardContent>
                <Typography sx={{mb: 3}} variant='h5'>Main Goal</Typography>
                <Typography sx={{fontSize: '16px'}}>{sprint.description}</Typography>
              </CardContent>
            </Card>
          </div>
          <hr />
          <div style={{display: 'flex', marginBottom: 10}}>
            <Typography variant='h5'>Features and Tasks</Typography>
            <Tooltip title="New Feature">
              <div className='link' style={{marginLeft: 'auto', marginRight: 10}} onClick={() => navigate('/addfeature/'+sprint.id)}>
                <svg className='btn-icon' xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </div>
          </Tooltip>
          </div>
          <div ref={featureTable} id='feature-table' style={{width: '100%', height: 'calc(100vh - 400px)' , marginTop: 0, overflowY: 'auto', padding: 0}} className='boxOutline'>
            {tree[0] ? 
            <table className='featureTable' style={{ width: '100%'}}>
              <tbody>
                <tr >
                  <th style={{width: '60px'}}></th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th style={{width: '60px'}}>Remaining Time</th> 
                </tr>
                {tree.map((val, key) => {
                  return(
                    <FeatureTableFeature key={key} feature={val} />
                  )
                })}
              </tbody>
            </table>
            : <Typography>No current features or tasks.</Typography>}
            
          </div>
        </div>
      }
      </>
      }

    </div>
  )
}

export default SprintDetails