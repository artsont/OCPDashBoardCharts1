import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MasterService } from '../../_service/master.service';
import { salesdata } from '../../_model/salesdata';
Chart.register(...registerables)

@Component({
  selector: 'app-mychart',
  standalone: true,
  imports: [],
  templateUrl: './mychart.component.html',
  styleUrl: './mychart.component.css'
})
export class MychartComponent implements OnInit {

  chartdata: salesdata[] = []
  labeldata: number[] = [];
  realdata: number[] = [];
  colordata: string[] = [];

  constructor(private service: MasterService) {

  }
  ngOnInit(): void {
    this.loadchartdata();
  }

  loadchartdata() {
    this.service.loadsalesdata().subscribe(item => {
      this.chartdata = item;
      if (this.chartdata != null) {
        this.chartdata.map(o => {
          this.labeldata.push(o.year);
          this.realdata.push(o.amount);
          this.colordata.push(o.colorcode)
        })
        this.Renderbarchart(this.labeldata, this.realdata, this.colordata);
        this.Renderpiechart(this.labeldata, this.realdata, this.colordata);
        this.Renderdoughnutchart(this.labeldata, this.realdata, this.colordata);
        this.RenderPAchart(this.labeldata, this.realdata, this.colordata);
        this.RenderRadarchart(this.labeldata, this.realdata, this.colordata);
        this.Renderlinechart(this.labeldata, this.realdata, this.colordata);
        this.RenderBubblechart();
        this.RenderScatterchart();
      }
    });
  }

  Renderbarchart(labeldata: any, valuedata: any, colordata: any){
    this.Renderchart(labeldata,valuedata,colordata,'barchart','bar')
  }
  Renderpiechart(labeldata: any, valuedata: any, colordata: any){
    this.Renderchart(labeldata,valuedata,colordata,'piechart','pie')
  }
  Renderdoughnutchart(labeldata: any, valuedata: any, colordata: any){
    this.Renderchart(labeldata,valuedata,colordata,'doughnutchart','doughnut')
  }
  RenderPAchart(labeldata: any, valuedata: any, colordata: any){
    this.Renderchart(labeldata,valuedata,colordata,'pachart','polarArea')
  }
  RenderRadarchart(labeldata: any, valuedata: any, colordata: any){
    this.Renderchart(labeldata,valuedata,colordata,'radarchart','radar')
  }
  Renderlinechart(labeldata: any, valuedata: any, colordata: any){
    this.Renderchart(labeldata,valuedata,colordata,'linechart','line')
  }

  RenderBubblechart(){
    const mychar = new Chart('bubblechart', {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Yearly sales',
            data: [
              {
                x:20,
                y:40,
                r:60
              },
              {
                x:30,
                y:60,
                r:90
              },
              {
                x:3,
                y:1,
                r:10
              },
            ],
            backgroundColor:['red','green','yellow']

          }
        ]
      },
      options: {
      }

    });
  }
  RenderScatterchart(){
    const mychar = new Chart('scatterchart', {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Yearly sales',
            data: [
              {
                x:20,
                y:40,
                r:60
              },
              {
                x:30,
                y:60,
                r:90
              },
              {
                x:3,
                y:1,
                r:10
              },
            ],
            backgroundColor:['red','green','yellow']

          }
        ]
      },
      options: {
      }

    });
  }

  Renderchart(labeldata: any, valuedata: any, colordata: any,chartid:string,charttype:any) {
    const mychar = new Chart(chartid, {
      type: charttype,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Yearly sales',
            data: valuedata,
            backgroundColor: colordata,

          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }

    });
  }

}
