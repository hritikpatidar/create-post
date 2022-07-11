import { Box, Button, Container, Grid, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Ilogin{
    email:string
    password:string
}
let initialState:Ilogin={
    email:"",
    password:""
}

let Login=()=>{
    //1.state/hooks
    const [userLogin, setUserLogin] = useState<Ilogin>(initialState);
    const navigate = useNavigate();

    //2.function defination
    let handleChange=(e:any)=>{
        const {name,value}=e.target
        setUserLogin({
            ...userLogin,
            [name]:value
        })
    }
    let handalRegister=async()=>{
        try {
            const response =await axios.post('http://192.168.1.11:8010/api/user/signin',userLogin)
            // console.log(response)
            localStorage.setItem("token",response.data.data.token);
            localStorage.setItem("userData",JSON.stringify(response.data.data));
            if(response.status === 200){
                navigate("/deshboard")
            }
        } catch (error) {
            console.log(error)
        }
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
                            
                            <Button variant="outlined" fullWidth onClick={handalRegister}>Login</Button>


                        </Box>
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}

export default Login
