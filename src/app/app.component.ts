import { Component } from '@angular/core';
import { LineChartComponent } from './component/linechart/linechart.component';
import { BarChartComponent } from './component/barchart/barchart.component';
import { DonutChartComponent } from './component/donutchart/donutchart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    LineChartComponent,
    BarChartComponent,
    DonutChartComponent
  ]
})
export class AppComponent { }
