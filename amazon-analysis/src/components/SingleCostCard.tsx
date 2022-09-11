import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import {CardHeader} from "@mui/material";


interface Props {
    title: string;
    cost: number
}

const renderCardHeader = (title: string) => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid >
                    <InsertChartIcon/>
                </Grid>
                <Grid>
                    <p>{title}</p>
                </Grid>
            </Grid>
        </Box>
    )
}

const formatCost = ((cost: number) => {
    return cost.toFixed(2);
})


export const SingleCostCard = (props: Props) => {
    return (
        <Card className={'basic-card'}>
            <CardHeader className={'basic-card-header'} title={renderCardHeader(props.title)} >
            </CardHeader>
            <CardContent className={'single-cost-card-content'}>
                <h3>${formatCost(props.cost)}</h3>

            </CardContent>
        </Card>
    );
}
