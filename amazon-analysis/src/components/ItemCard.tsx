import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {Item} from "./Dashboard";
import {CardHeader} from "@mui/material";


interface Props {
    title: string;
    item: Item;
}

const renderCardHeader = (title: string) => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid >
                    <MonetizationOnIcon/>
                </Grid>
                <Grid>
                    <p>{title}</p>
                </Grid>
            </Grid>
        </Box>
    )
}


export const ItemCard = (props: Props) => {
    return (
        <Card className={'basic-card'}>
            <CardHeader className={'basic-card-header'} title={renderCardHeader(props.title)} >
            </CardHeader>
            <CardContent className={'basic-card-content'}>

                <p><b>Item</b>: {props.item.name}</p>
                <p><b>Date</b>: {props.item.purchaseDate}</p>
                <p><b>Cost</b>: ${props.item.price}</p>

            </CardContent>
        </Card>
    );
}
