import { useParams } from 'react-router'
import React, { useState } from 'react'
import { useEffect } from "react"
import SprintService from '../../Services/SprintService';
import { Typography } from '@mui/material';
import Loading from '../Loading/Loading';
import PageNotFound from '../PageNotFound/PageNotFound';

const SprintDetails = () => {

    const { id } = useParams();
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi; //used to determine if id is a valid uuid

    const [fail, setFail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sprint, setSprint] = useState({});

    

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
          console.log(JSON.stringify(result)); // --- continue from here
        }
        else{
          setFail(true);
          setLoading(false);
          return;
        }
        


      }

        setLoading(false);
    }
    getSprintDetails();

    return () => {
      setSprint({}); // fixes werid bug with memory leaks
    };
    }, []);

  return (
    <div style={{padding: 20}}>
      {loading ? <Loading>Loading</Loading>:
      <>
      {fail ? <PageNotFound/> :
        <div>
          <Typography>{sprint.name}</Typography>
        </div>
      }
      </>
      }

    </div>
  )
}

export default SprintDetails