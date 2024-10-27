import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MasterService } from '../../_service/master.service';

Chart.register(...registerables);

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.css'],
  imports: []
})
export class DonutChartComponent implements OnInit {

  labeldata: string[] = [];
  realdata: number[] = [];
  colordata: string[] = [];

  constructor(private service: MasterService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.service.getDonutChartData().subscribe(data => {
      if (data != null) {
        data.map((o: { label: string; value: number; color: string; }) => {
          this.labeldata.push(o.label);
          this.realdata.push(o.value);
          this.colordata.push(o.color);
        });

        this.renderChart();
      }
    });
  }

  renderChart() {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.labeldata,
        datasets: [{
          data: this.realdata,
          backgroundColor: this.colordata,
          borderWidth: 0  // Remove the white border between segments
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',  // Adjusts the thickness of the donut
        layout: {
          padding: {
            right: 30,  // Adds padding to separate the chart from the legend
          }
        },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#ffffff',
              usePointStyle: true,
              pointStyle: 'rectRounded',
              boxWidth: 12,
              boxHeight: 12,
              font: {
                size: 12  // Smaller font size to make legend more compact
              },
              padding: 16  // Adds more space between legend items
            }
          }
        }
      }
    });
  }
}
