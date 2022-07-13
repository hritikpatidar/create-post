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

    let size =(length:number,index:number )=>{
            if(length == 1){
                let col = index==0 ? 2 : 1 ;
                return col
            }else if(length == 3){
                let col = index == 2 ? 2 :1 ;
                return col
            }
    }
    let getTime=(time:any)=>{
        const date = new Date(time);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        
        const realtime = new Date()
        const year1 = realtime.getFullYear();
        const month1 = realtime.getMonth()+1;
        const day1 = realtime.getDate();
        let hr1 = realtime.getHours();
        let min1 = realtime.getMinutes();
        let sec1 = realtime.getSeconds();

        console.log("realtime",hr1+ ":"+min1)
        
        if(min-min1 == 0){
            let second = sec-sec1 +"sec ago"
            return  second
        }else if(hr- hr1 == 0){
            let minutes = min - min1 + "min ago"
            return minutes
        }else if(day -day1 == 0){
            let hours = hr1 - hr +"hours ago"
            // console.log(days)
            return hours
        }else if(month - month1 == 0){
            let days = day1 - day +"days ago"
            return days
        }else if(year - year1 == 0){
            // let months = month - month1+"months ago"
            let years = year - year1 + "year ago"
            return years
        }
        
        
       
    }
    //return statement
    return (
        <Container maxWidth="sm">
            {
                userPost.map((cv: any, index: number) => {
                    const time:any = getTime(cv.dateCreated);
                    // console.log("time",time)
                    return (
                        <Card sx={{ minWidth: 275, mt: 5 }} key={index}>
                            <CardContent>
                                <Typography variant="h6" component="h2">
                                    Title-  {cv?.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    Description- {cv?.description}
                                </Typography>
                                { cv.images ?
                                <ImageList sx={{ minwidth: 500, minheight: 450 }} variant="quilted" cols={2} rowHeight={auto}>
                                    {

                                    cv?.images?.map((item: any, index: number) => {
                                        let col = size(cv.images.length ,index)
                                        return(
                                            <React.Fragment key={index}>
                                                {
                                                index <  4 ?
                                                <ImageListItem cols={col} rows={1}>
                                                    <img
                                                        src={`${item.image}`}
                                                        srcSet={`${item.image}`}
                                                        alt={item.title}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem> : null
                                                }
                                            </React.Fragment>
                                        )
                                    })}
                                </ImageList>
                                : null
                                }
                                <Typography variant="subtitle1" gutterBottom component="div">
                                    {time}
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
