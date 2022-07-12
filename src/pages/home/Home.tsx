import { Card, CardContent, Container, Grid, ImageList, ImageListItem, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import logo from '../../assets/images/download.jpeg';
// const logo =  require("../../assets/images/12.webp")
import './Home.css'
import axios from 'axios';
import { auto } from '@popperjs/core';


interface Iuser {
    title: string
    description: string
    images: any
    dateCreated: any
}

function Home() {
    //state/hooks 
    const [userPost, setUserPost] = useState<any>([])
    useEffect(() => {
        handalUserPost();
        createPostTime();
    }, [])

    // function defination
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    let handalUserPost = async () => {
        let token: any = localStorage.getItem('token')
        try {
            const response = await axios.get('http://192.168.1.11:8010/api/post/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            setUserPost(response.data.data)
            

        } catch (error) {
            console.log(error)
        }
    }

    let createPostTime=()=>{
        // console.log('okokok')
        let newData = new Date(userPost.dateCreated)
        console.log(newData)
    }
    //return statement
    return (
        <Container maxWidth="sm">
            {
                userPost.map((cv: any, index: number) => {
                    return (
                        <Card sx={{ minWidth: 275, mt: 5 }} key={index}>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    Title-  {cv?.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    Description- {cv?.description}
                                </Typography>

                                <ImageList sx={{ minwidth: 500, minheight: 450 }} variant="quilted" cols={2} rowHeight={auto}>
                                    {cv?.images?.map((item: any, index: number) => {
                                        const col = cv.images.length==1 ? 2 : 1  
                                        const row = cv.images.length==1 ? 2 : 1
                                        
                                        return(
                                            <React.Fragment key={index}>
                                                <ImageListItem key={index} cols={col} rows={row}>
                                                    <img
                                                        src={`${item.image}`}
                                                        srcSet={`${item.image}`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            </React.Fragment>
                                        )
                                    })}
                                </ImageList>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {
                                        
                                    }
                                </Typography>
                            </CardContent>
                            
                            <Grid container spacing={0} columns={16}>
                                <Grid item xs={8}>
                                    <Item><FavoriteBorderIcon /></Item>
                                </Grid>
                                <Grid item xs={8}>
                                    <Item><ChatBubbleOutlineIcon /></Item>
                                </Grid>
                            </Grid>
                        </Card>
                    )
                })
            }

        </Container>
    )
}

export default Home
