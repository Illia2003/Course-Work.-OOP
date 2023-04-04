import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

function Index ({ordersCurrentMonth, ordersMonths}){
    const ordersChartData = () => {
        let ordersCount = [];
        
        for (const key in ordersMonths) {
            ordersCount.push(ordersMonths[key]);
        }

        return ordersCount;
    }

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    const labelsChart = () => {
        let labels = [];

        for (const key in ordersMonths) {
            labels.push(key);
        }

        return labels;
    };

    const data = {
        labels: labelsChart(),
        datasets: [
          {
            label: 'Кількість замовлень',
            data: ordersChartData(),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };

    const options = {
        responsive: true,
    };

    let earningCurrentMonth = () => {
        let total = 0;

        ordersCurrentMonth.forEach((current) => {
            total += current.total;
        });

        return total;
    };

        return(
            <Authenticated>
                <Grid item xs={12} >
                    <Box component={Paper}
                    className="main-content__item" 
                    sx={{width: "100%", display: "flex", alignItems:"center", justifyContent:"space-between"}}>
                        <Typography variant="h3" sx={{fontSize: "36px"}}>
                            Аналітика
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component={Paper}
                    className="main-content__item main-content__item--white">
                        <Typography variant="h6" sx={{fontSize: "18px"}}>
                            Кількість замовлень за цей місяць
                        </Typography>

                        <Typography variant="h4" sx={{fontSize: "30px", marginTop: "14px"}}>
                            {`${ordersCurrentMonth.length} замовлень`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component={Paper}
                    className="main-content__item main-content__item--white">
                        <Typography variant="h6" sx={{fontSize: "18px"}}>
                            Заробіток за теперішній місяць
                        </Typography>

                        <Typography variant="h4" sx={{fontSize: "30px", marginTop: "14px"}}>
                            {`${earningCurrentMonth()} грн`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box component={Paper}
                    className="main-content__item main-content__item--white">
                        <Typography variant="h6" sx={{fontSize: "18px"}}>
                            Кількість замовлень протягом 6 місяців
                        </Typography>

                        <Line options={options} data={data} />
                    </Box>
                </Grid>
            </Authenticated>
        );
}

export default Index;