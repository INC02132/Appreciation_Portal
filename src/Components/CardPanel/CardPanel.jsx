import { Box, Grid, IconButton, TextField, Typography, IconButtton, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import AppreciationCard from '../AppreciationCard/AppreciationCard';
import SearchIcon from "@mui/icons-material/Search";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Blocks } from 'react-loader-spinner';

const CardPanel = ({ statusHandler, fetchData = null, panelTitle = "", cards, setSelectedCard, type = "" }) => {
    const [searchText, setSearchText] = useState("");


    return (
        <Grid container gap={1} sx={{ height: '100%', padding: "1em 1em" }}>
            {fetchData !== null ?
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography
                        sx={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            textAlign: "center",
                            marginTop: "1em",
                        }}
                    >
                        {panelTitle}
                    </Typography>
                    <Select sx={{ height: "30px" }} defaultValue={"all"} onChange={(e) => statusHandler(e.target.value)}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                </Box> :
                <Typography
                    sx={{
                        fontSize: "1rem",
                        fontWeight: "500",
                        textAlign: "center",
                        marginTop: "1em",
                    }}
                >
                    {panelTitle}
                </Typography>
            }
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    border: 1,
                    width: "300px",
                    borderColor: "#D9D9D9",
                    borderRadius: "7px",
                    padding: "0rem",
                }}
            >
                <TextField
                    sx={{ paddingLeft: "0.5rem" }}
                    id="input-with-sx"
                    variant="standard"
                    placeholder="Search"
                    fullWidth
                    focused={false}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{ disableUnderline: true }}
                />
                <IconButton disableRipple>
                    <SearchIcon />
                </IconButton>
            </Box>

            {
                fetchData !== null &&
                <Box
                    className="wbScroll"
                    id="scrollableDiv"
                    sx={{
                        height: "70%",
                        width: "100%",
                        overflowY: "scroll",
                        padding: "1rem"
                    }}>
                    <InfiniteScroll
                        dataLength={cards.length}
                        next={() => fetchData()}
                        hasMore={true}
                        width="100%"
                        scrollableTarget="scrollableDiv"
                    // height={"70vh"}
                    // loader={<div className="loader" key={0}>Loading ...</div>}
                    >

                        {cards?.map((item, index) => {
                            return (item?.template?.category?.toLowerCase().includes(searchText?.toLowerCase()) || (item?.status?.toLowerCase().includes(searchText?.toLowerCase())) ||
                                `${item?.receiver?.firstName?.toLowerCase()} ${item?.receiver?.lastName?.toLowerCase()}`
                                    .includes(searchText?.toLocaleLowerCase())) && (
                                    <AppreciationCard
                                        key={index}
                                        type={type}
                                        cardData={item}
                                        setSelectedCard={setSelectedCard}
                                    />
                                );
                        })}
                        {
                            (cards?.length === 0 || cards === null) &&
                            <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Blocks
                                    visible={true}
                                    height="60"
                                    width="60"
                                    ariaLabel="blocks-loading"
                                    wrapperStyle={{
                                        color: "#002947"
                                    }}
                                    wrapperClass="blocks-wrapper"
                                /></Box>
                        }
                    </InfiniteScroll>
                </Box>

            }
            {
                fetchData === null &&
                <Box className="wbScroll" sx={{
                    height: "70%",
                    width: "100%",
                    overflowY: "scroll", padding: "1rem"
                }}>
                    {cards?.map((item, index) => {
                        return (item?.template?.category?.toLowerCase()
                            .includes(searchText?.toLowerCase()) ||
                            `${item?.receiver?.firstName?.toLowerCase()} ${item?.receiver?.lastName?.toLowerCase()}`
                                .includes(searchText?.toLocaleLowerCase())) && (
                                <AppreciationCard
                                    key={index}
                                    type={type}
                                    cardData={item}
                                    setSelectedCard={setSelectedCard}
                                />
                            );
                    })}
                    {
                        (cards?.length === 0 || cards === null) &&
                        <Box sx={{ width: "100%", height: "250px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Blocks
                                visible={true}
                                height="60"
                                width="60"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                            /></Box>
                    }
                </Box>
            }

        </Grid>
    )
}

export default CardPanel