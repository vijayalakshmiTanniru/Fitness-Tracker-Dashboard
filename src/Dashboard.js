import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography,
  ToggleButtonGroup, ToggleButton,
  Grid, Card, CardContent
} from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Dummy data
const daily = [2000,5000,3000,7000,4500,6000,3500];
const weekly = [30000,35000,32000,40000];
const monthly = [120000,130000,125000];
const labels = {
  daily: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  weekly: ['Week 1','Week 2','Week 3','Week 4'],
  monthly: ['Jan','Feb','Mar']
};
const metricMap = {
  daily: 'Calories',
  weekly: 'Steps',
  monthly: 'Workouts'
};

export default function Dashboard() {
  const [view, setView] = useState('daily');
  const dataMap = { daily, weekly, monthly };
  const chartData = {
    labels: labels[view],
    datasets: [{
      label: metricMap[view],
      data: dataMap[view],
      borderColor: '#3f51b5',
      backgroundColor: 'rgba(63,81,181,0.3)',
      fill: true,
    }],
  };

  return (
    <div className="dashboard">
      <AppBar position="static">
        <Toolbar className="headerToolbar">
          <Typography variant="h6">Fitness Dashboard</Typography>
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(e, v) => v && setView(v)}
          >
            <ToggleButton value="daily">Daily</ToggleButton>
            <ToggleButton value="weekly">Weekly</ToggleButton>
            <ToggleButton value="monthly">Monthly</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {['Calories','Steps','Workouts'].map((stat, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Card className="statCard">
              <CardContent>
                <Typography variant="h5">{stat}</Typography>
                <Typography variant="h4">
                  {Math.floor(Math.random()
                    * (view==='daily'?8000:view==='weekly'?50000:200000))}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <div className="chartWrapper">
            {view === 'weekly' ? (
              <Bar data={chartData} options={{ responsive: true }} />
            ) : (
              <Line data={chartData} options={{ responsive: true }} />
            )}
          </div>
        </Grid>

        <Grid item xs={12}>
          <Card className="chartWrapper">
            <CardContent>
              <Typography variant="h6">Activity Log</Typography>
              <table className="logTable">
                <thead>
                  <tr><th>Date</th><th>Activity</th><th>Value</th></tr>
                </thead>
                <tbody>
                  {labels[view].map((d,i)=>(
                    <tr key={i}>
                      <td>{d}</td>
                      <td>{['Run','Walk','Bike'][i%3]}</td>
                      <td>{dataMap[view][i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
