import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardHeader} from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChart";

import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import {Item} from "./Dashboard";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

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
        tooltip: {
            callbacks: {
                label: function(ctx) {
                    // console.log(ctx.dataset.data[ctx.dataIndex].label);
                    let label = `${ctx.dataset.data[ctx.dataIndex].label}`
                    return label;
                }
            }
        }
    },
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false
            }
        }
    },

};

interface Props {
    title: string;
    items: Array<Item>
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

const formatData = ((data: Array<any>) => {


    const formatted = data.map((item: Item, index) => {
        return {
            x: index,
            y: item.price,
            label: item.name,
        }
    })

    const formattedData = {
        datasets: [
            {
                label: 'Item Distribution',
                data: formatted,
                backgroundColor: '#ef5350',

            }
        ]
    }


    return formattedData
})


export const ItemScatterChartCard = (props: Props) => {
    return (
        <Card className={'item-scatter-chart-card'}>
            <CardHeader className={'basic-card-header'} title={renderCardHeader(props.title)} >
            </CardHeader>
            <CardContent className={'basic-card-content'}>
                <Scatter data={formatData(props.items)} options={options} />
            </CardContent>
        </Card>
    );
}
