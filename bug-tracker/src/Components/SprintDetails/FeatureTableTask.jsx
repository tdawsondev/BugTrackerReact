import { Button } from '@mui/material';
import React, {useState } from 'react'
import FeatureTableSubtasks from './FeatureTableSubtasks';

const FeatureTableTask = ({task}) => {

    const [open, setOpen] = useState(false);
    const [showPlus, setShow] = useState(false);
    const [showPlus2, setShow2] = useState(false);




  return (
    <>
        <tr onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} style={{padding: 0, border: 'solid 1px black'}}>
            <td style={{width: '60px'}}>{showPlus && '+'}</td>
            <td style={{paddingLeft: '50px', display: 'flex', border: 'none'}}>
                {task.Subtasks[0] ? <button className='carretButton' onClick={() => setOpen(!open)}>{open ? '-': '+'}</button> : <div style={{width: '25px'}}></div>}
                <div>{task.name}</div>
                </td>
            <td>{task.status}</td>
            <td>{task.user_name}</td>
            <td style={{width: '60px'}}>{task.remaining_time}</td>
        </tr>
        {open ? <>
        {task.Subtasks.map((val, key) =>{
            return(
            <FeatureTableSubtasks key={key} subtask={val} /> )
        })}
        </>: <></>}
    </>
  )
}

export default FeatureTableTask