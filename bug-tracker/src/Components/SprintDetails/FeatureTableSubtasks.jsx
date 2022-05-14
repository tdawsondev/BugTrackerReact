import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'

const FeatureTableSubtasks = ({subtask}) => {

    const [showPlus, setShow] = useState(false);


  return (
    <>
        <tr onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} style={{padding: 0, border: 'solid 1px black'}}>
            <td style={{width: '60px'}}>{showPlus && ''}</td>
            <td style={{paddingLeft: '100px', display: 'flex', border: 'none'}}>
                <div>{subtask.name}</div>
            </td>
            <td>{subtask.status}</td>
            <td>{subtask.user_name}</td>
            <td style={{width: '60px'}}>{subtask.remaining_time}</td>
                    
        </tr>
    </>
  )
}

export default FeatureTableSubtasks