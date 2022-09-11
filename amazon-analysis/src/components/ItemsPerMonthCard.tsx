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
import {Item} from "./Dashboard";

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

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


interface Props {
    title: string;
    items: Array<Item>;
    index: number;
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

const formatData = ((data: Array<Item>, index: number) => {

    const itemsPerMonth = []

    data.map(item => {
        const month = item.purchaseDate.split('/')[0]
        if (itemsPerMonth[month]) {
            itemsPerMonth[month].push(item)
        }
        else {
            itemsPerMonth[month] = [];
            itemsPerMonth[month].push(item);
        }
    })


    const displayData = [];

    itemsPerMonth.forEach(item => {
        displayData.push(item.length)
    });

    console.log(itemsPerMonth);




    const formattedData = {
        labels,
        datasets: [
            {
                label: 'Item Distribution',
                data: itemsPerMonth.sort(),
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


    return formattedData;
})


export const ItemsPerMonthCard = (props: Props) => {
    return (
        <Card className={'price-range-card'}>
            <CardHeader className={'basic-card-header'} title={renderCardHeader(props.title)} >
            </CardHeader>
            <CardContent className={'basic-card-content'}>
                <Bar options={options} data={formatData(props.items, props.index)}/>
            </CardContent>
        </Card>
    );
}
