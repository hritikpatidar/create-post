import React from 'react'
import { Button } from '@mui/material'
import "./EmailVarification.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'

function EmailVarification() {
    const params = useParams();
    const navigate = useNavigate()
    let hadleVerify = async()=>{
        try {
            const response = await axios.get("http://192.168.1.11:8010/api/user/verifyEmail/"+ params.id)
            // console.log(response)
            if(response.status === 200){
                Swal.fire(
                    response.data.message,
                    response.statusText,
                    'success'
                )
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log("params",params)
    return (
        <div>
            <Button 
                type="button" 
                className='EmailVarify' 
                variant="contained" 
                onClick={hadleVerify}
            > 
                Varification
            </Button>
        </div>
    )
}

export default EmailVarification
