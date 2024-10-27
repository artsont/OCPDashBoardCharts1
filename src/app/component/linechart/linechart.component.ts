import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MasterService } from '../../_service/master.service';

Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LineChartComponent implements OnInit {

  labeldata: number[] = [];
  option1Data: number[] = [];
  option2Data: number[] = [];

  constructor(private service: MasterService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.service.getLineChartData().subscribe(data => {
      if (data != null) {
        data.map((o: any) => {  // Directly use 'any' type to handle JSON data without a model
          this.labeldata.push(o.points);
          this.option1Data.push(o.option1);
          this.option2Data.push(o.option2);
        });
        this.renderChart();
      }
    }, error => {
      console.error("Error loading data:", error);
    });
  }

  renderChart() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error("Canvas element not found");
      return;
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labeldata,
        datasets: [
          {
            label: 'Option 1',
            data: this.option1Data,
            borderColor: '#389CD8',
            backgroundColor: '#389CD8',
            fill: false,
            tension: 0,
            pointBackgroundColor: '#389CD8',
            pointRadius: 4
          },
          {
            label: 'Option 2',
            data: this.option2Data,
            borderColor: '#37C471',
            backgroundColor: '#37C471',
            fill: false,
            tension: 0,
            pointBackgroundColor: '#37C471',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 100,  // Explicitly set max to 100
            ticks: {
              stepSize: 20,  // Step size of 20 for y-axis
              color: '#FFFFFF'
            },
            grid: {
              color: '#505866'  // Set gridline color to match the bar chart
            }
          },
          x: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,  // Step size of 20 for x-axis
              color: '#FFFFFF'
            },
            grid: {
              color: '#505866'  // Set gridline color to match the bar chart
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            display: true,
            labels: {
              color: '#FFFFFF',
              usePointStyle: true,
              pointStyle: 'rectRounded',
              boxWidth: 12,
              boxHeight: 12
            }
          }
        }
      }
    });
  }
}
