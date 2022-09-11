import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardHeader} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Items by Price Range',
        },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};

const labels = ['$0-$25', '$25-$50', '$50-$100', '$100-500', '$500+']


interface Props {
    title: string;
    costArray: Array<number>
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

const formatData = ((data: Array<number>) => {

    const formattedData = {
        labels,
        datasets: [
            {
                label: 'Item Distribution',
                data: data,
                backgroundColor: [
                    '#42a5f5',
                    '#ba68c8',
                    '#ef5350',
                    '#ff9800',
                    '#4caf50',
                ],
            }
        ]
    }


    return formattedData
})


export const PriceRangeCard = (props: Props) => {
    return (
        <Card className={'price-range-card'}>
            <CardHeader className={'basic-card-header'} title={renderCardHeader(props.title)} >
            </CardHeader>
            <CardContent className={'basic-card-content'}>
                <Bar options={options} data={formatData(props.costArray)}/>
            </CardContent>
        </Card>
    );
}
