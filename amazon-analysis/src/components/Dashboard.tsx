import * as React from 'react';
import {useState} from "react";

//MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import {ItemCard} from "./ItemCard";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {SingleCostCard} from "./SingleCostCard";
import {PriceRangeCard} from "./PriceRangeCard";
import {ItemScatterChartCard} from "./ItemScatterChartCard";
import {ItemsPerMonthCard} from "./ItemsPerMonthCard";

export interface Stats {
    grandTotal: number
    itemCountByCost: Array<number>
    mostExpensive: Item
    leastExpensive: Item
    scatterChartData: Array<ScatterChartItem>
    items: Array<Item>

    startDate: string
    endDate: string

}

export interface ScatterChartItem {
    x: string
    y: number
    label: string
}

export interface Item {
    purchaseDate: string
    price: number
    name: string
}


export const Dashboard = () => {

    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [results, setResults] = useState(
        {
            grandTotal: 0.00,
            itemCount: 0,
            averageCost: 0.00,
            itemCountByCost: [0,0,0,0,0],
            leastExpensive: {
                price: 9999.99,
                purchaseDate: '',
                name: ''
            },
            mostExpensive: {
                price: 0.00,
                purchaseDate: '',
                name: ''
            },
            scatterChartData: [],
            items: [],
            startDate: '',
            endDate: '',
            isLoaded : false
        },
    )

    const parseFile = async (rawData: string) => {

        setResults({...results, isLoaded: false});

        const response = await axios.post('/transform',
            {
                data: rawData
            }
        )
        if (response.data.status === 200) {
            setResults({...response.data.results, isLoaded: true});
        }

    }

    const handleUploadFile = async (event : any) => {
        const fileReader = new FileReader();

        fileReader.readAsText(event.target.files[0]);
        fileReader.onload = (e) => {
            if (e && e.target) {
                const rawData: any = e.target.result;
                parseFile(rawData)
            }

        };
    }

    return (
        <Box>
            <header className="App-header">
                <Grid container spacing={2}>
                    <Grid>
                        <h1>Amazon Analyzer</h1>
                    </Grid>
                    <Grid className={'upload-button-position'}>
                        <Button
                            className={'upload-button'}
                            variant={'contained'}
                            onClick={() => setUploadDialogOpen(true)}
                        >Upload File
                        </Button>
                    </Grid>
                </Grid>
            </header>

            <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
                <DialogTitle>Upload File</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please upload an Amazon Item Data .csv file
                    </DialogContentText>
                    <input
                        type={'file'}
                        accept={'.csv'}
                        style={{ display: 'none' }}
                        id={'item-csv-button'}
                        onChange={(target) => {
                            setUploadDialogOpen(false)
                            handleUploadFile(target)
                            }
                        }
                        multiple
                    />
                    <label htmlFor={'item-csv-button'}>
                        <Button
                            variant={'outlined'}
                            component={'span'}
                        >
                            Item CSV
                        </Button>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            {
                results.isLoaded &&
                <Box>
                    <p><b>Start Date:</b> {results.startDate}   <b>End Date:</b> {results.endDate}</p>
                    <Grid container spacing={1}>
                        <Grid>
                            <SingleCostCard title={'Grand Total'} cost={results.grandTotal}/>
                        </Grid>
                        <Grid>
                            <ItemCard title={'Most Expensive'} item={results.mostExpensive}/>
                        </Grid>
                        <Grid>
                            <ItemCard title={'Least Expensive'} item={results.leastExpensive}/>
                        </Grid>
                        <Grid>
                            <SingleCostCard title={'Average Cost'} cost={results.averageCost}/>
                        </Grid>
                        <Grid>
                            <PriceRangeCard title={'Items by Price Range - Bar'} costArray={results.itemCountByCost}/>
                        </Grid>
                        <Grid>
                            <ItemScatterChartCard title={'Items by Price Range - Bar'} items={results.items}/>
                        </Grid>
                        <Grid>
                            <ItemsPerMonthCard title={'Items Per Month'} items={results.items} index={1}/>
                        </Grid>

                    </Grid>
                </Box>
            }

        </Box>
    )
}




