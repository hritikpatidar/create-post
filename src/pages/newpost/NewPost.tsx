import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import Swal from 'sweetalert2'

var FormData = require('form-data');

interface IuserDetails{
    title:string
    description:string
    images:[] | any
}
let initialState:IuserDetails={
    title:"",
    description:"",
    images:[]
}
function DeshBoard() {
    const [image, setImage] = useState<any>([])
    const [userDetails, setUserDetails] = useState<IuserDetails>(initialState);


    const token = localStorage.getItem("token")

    let handalImageChange=(e:any)=>{
        const file = [...e.target.files]
        userDetails.images = file;
        Array.from(e.target.files).forEach((file:any) => {
            
            const reader = new FileReader();
            reader.onload =()=>{
                    setImage( (prevState:any) => [...prevState, reader.result]);
            }
            reader.readAsDataURL(file);
        });
    }
    let handalChange=(e:any)=>{
        const {name,value} = e.target;
        
        setUserDetails({
            ...userDetails,
            [name]:value
        })
    }
    let handalPost =async()=>{
        let newData = new FormData()
        newData.append("title",userDetails.title);
        newData.append("description",userDetails.description);
        // let arrayOfYourFiles=userDetails.images
        userDetails.images.forEach((file:any)=>{
            newData.append("images", file);
        });
        console.log("temparr",newData)
        try {
            const res = await axios.post("http://192.168.1.11:8010/api/post",newData,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            if(res.status === 201){
                Swal.fire(
                    res.data.message,
                    res.statusText,
                    'success'
                  )
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log("image",image)
    // console.log("userDetails",userDetails)
    return (
        <Container maxWidth="lg">
            <Card sx={{ minWidth: 275 , mt:5}}>
                <CardContent>
                    <TextField 
                        id="standard-basic" 
                        label="Title" 
                        name="title"
                        value={userDetails.title}
                        variant="standard" 
                        onChange={handalChange}
                        fullWidth
                    /><br/>
                    <TextField
                        sx={{mt:2}}
                        id="standard-multiline-static"
                        label="Description"
                        name="description"
                        value={userDetails.description}
                        multiline
                        rows={3}
                        variant="standard"
                        onChange={handalChange}
                        fullWidth
                    />
                    <TextField 
                        sx={{mt:2}}
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        type="file"
                        name="images"
                        inputProps={{
                          multiple: true
                        }}
                        onChange={handalImageChange}
                        fullWidth
                    />

                    <ImageList sx={{ minwidth: 500, minheight: 450 }} cols={3} rowHeight={264}>
                        {image.map((item:any,index:number) => (
                            <ImageListItem key={index}>
                            <img
                                src={item}
                                loading="lazy"
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handalPost} fullWidth>Post</Button>
                </CardActions>
            </Card>
        </Container>
    )
}

export default DeshBoard
