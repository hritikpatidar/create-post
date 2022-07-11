import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import './Register.css'
import { Button, Grid } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Stack from '@mui/material/Stack';
import axios from "axios"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

interface Iregister{
    firstName:string
    lastName:string
    userName:string
    email:string
    password:string
    dob:number | string |any
}
let initialState:Iregister={
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
    password:"",
    dob:""
}

let Register=() => {
    const [value, setValue] = React.useState<Date | null>(
        new Date(),
      );
    const [registerUser, setRegisterUser] = useState<Iregister>(initialState);
    const navigate = useNavigate();

    let handleChange =(e:any)=>{
        const {name,value} =e.target
        setRegisterUser({
            ...registerUser,
            [name]:value
        })

    }
    let handleDob=(newValue:any)=>{
        let year:number = newValue.getFullYear();
        let month:number = newValue.getMonth();
        let date:number = newValue.getDate();
        let newDate:any = `${date +"-"+ month+"-"+year}`
        setValue(newDate)
        registerUser.dob=value
    }
    let handalRegister=async()=>{
        // console.log(registerUser)
        try {
            const response = await axios.post('http://192.168.1.11:8010/api/user/signup',registerUser)
            // console.log(response)
            if(response.status === 201){
                Swal.fire(
                    response.data.message,
                    response.statusText,
                    'success'
                  )
            }
        } catch (error:any) {
            console.log(error)
            Swal.fire(
                error.message,
                error.name,
                'error'
              )
        }
    }

    let handalLogin=()=>{
        navigate("/login")
    }
    return (
        <>
            <Container maxWidth="sm">
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '97%' },
                            }}
                            noValidate
                            autoComplete="off"
                            className="border"
                        >

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="firstName"
                                    type="text"
                                    name="firstName"
                                    variant="outlined"
                                    onChange={handleChange}
                                /><br />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="lastName"
                                    type="text"
                                    name="lastName"
                                    variant="outlined"
                                    onChange={handleChange}
                                /><br />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="userName"
                                    type="text"
                                    name="userName"
                                    variant="outlined"
                                    onChange={handleChange}
                                /><br />
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="email"
                                    type="text"
                                    name="email"
                                    variant="outlined"
                                    onChange={handleChange}
                                /><br />
                                <TextField
                                    required
                                    id="filled-password-input"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                       
                                        <DateTimePicker
                                            label="date of birth"
                                            inputFormat="dd/MM/yyyy"
                                            renderInput={(params:any) => <TextField {...params} />}
                                            value={registerUser.dob}
                                            onChange={handleDob}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                                <Button variant="outlined" fullWidth onClick={handalRegister}>Register</Button>
                                <Button variant="outlined" className="r-margin" fullWidth onClick={handalLogin}>Already Register</Button>
                        </Box>
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}

export default Register
