import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MasterService } from '../../_service/master.service';

Chart.register(...registerables);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  imports: []
})
export class BarChartComponent implements OnInit {

  @Input() chartId: string = '';       // Unique ID of the chart canvas
  @Input() direction: string = 'vertical';  // 'vertical' or 'horizontal'

  labeldata: string[] = [];
  option1Data: number[] = [];
  option2Data: number[] = [];

  constructor(private service: MasterService) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    if (this.direction === 'vertical') {
      this.service.getVerticalBarChartData().subscribe(data => {
        this.populateChartData(data);
        this.renderChart();
      });
    } else if (this.direction === 'horizontal') {
      this.service.getHorizontalBarChartData().subscribe(data => {
        this.populateChartData(data);
        this.renderChart();
      });
    }
  }

  // Populate chart data
  populateChartData(data: any) {
    if (data != null) {
      data.map((o: any) => {
        const shortLabel = this.direction === 'vertical' ? o.month.substring(0, 3) : o.quarter;  // Only take first 3 characters for months in vertical mode
        this.labeldata.push(shortLabel);
        this.option1Data.push(o.option1);
        this.option2Data.push(o.option2);
      });
    }
  }

  renderChart() {
    const ctx = document.getElementById(this.chartId) as HTMLCanvasElement;

    // Conditional colors based on chart direction
    const option1Color = this.direction === 'horizontal' ? '#389CD8' : '#37C471';  // Blue for horizontal, green for vertical
    const option2Color = this.direction === 'horizontal' ? '#37C471' : '#FF5D5D';  // Green for horizontal, red for vertical

    const barThicknessValue = 15; // Define the bar thickness value
    const maxBarThicknessValue = 20; // Define the max bar thickness value

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labeldata,
        datasets: [
          {
            label: 'Option 1',
            data: this.option1Data,
            backgroundColor: option1Color,
            barThickness: barThicknessValue,
            maxBarThickness: maxBarThicknessValue
          },
          {
            label: 'Option 2',
            data: this.option2Data,
            backgroundColor: option2Color,
            barThickness: barThicknessValue,
            maxBarThickness: maxBarThicknessValue
          }
        ]
      },
      options: {
        indexAxis: this.direction === 'horizontal' ? 'y' : 'x',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: '#FFFFFF'
            },
            grid: {
              display: true,
              color: '#505866',
              drawOnChartArea: this.direction === 'horizontal' ? true : false  // Vertical gridlines for horizontal chart only
            },
            border: {
              display: false  // Removes the border line at the start of the x-axis
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#FFFFFF'
            },
            grid: {
              display: true,
              color: '#505866',
              drawOnChartArea: this.direction === 'vertical' ? true : false  // Horizontal gridlines for vertical chart only
            },
            border: {
              display: false  // Removes the border line at the start of the y-axis
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#FFFFFF',
              usePointStyle: true,
              pointStyle: 'rectRounded',
            }
          }
        }
      }
    });
  }
}
