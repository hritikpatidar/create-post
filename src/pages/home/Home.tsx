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
        handalUserPost()
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
           
            setUserPost(response.data.data)
        } catch (error) {
            console.log(error)
        }
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
                                {
                                    cv?.images?.map((item: any, index: number) => {
                                        
                                      return(
                                        <React.Fragment key={index}>
                                            <ImageList sx={{ minwidth: 500, minheight: 450 }} cols={1} rowHeight={auto}>
                                                    <ImageListItem>
                                                    <img
                                                        src={item.image}
                                                        loading="lazy"
                                                    />
                                                    </ImageListItem>
                                               
                                            </ImageList>
                                        </React.Fragment >
                                        
                                        )
                                    })
                                }

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
