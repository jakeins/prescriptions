import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  public pieData!: Object[];
  public pieData1!: Object[];
  public startAngle!: number;
  public endAngle!: number;
  public center!: Object;
  public explode!: boolean;
  public enableAnimation!: boolean;
  public title!: string;
  public statsTitle!: string;
  public title2!: string;
  public radius!: string;
  public legendSettings!: Object;
  public datalabel!: Object;
  public tooltipThreatment!: Object;
  public tooltipMedication!: Object;
  public palette!: string[];
  public primaryXAxis!: Object;
  public chartData!: Object[];
  public primaryYAxis!: Object;
  public profiles!: Object[];

  ngOnInit(): void {
      this.datalabel = {
          visible: true,
          name: 'text',
          position: 'Inside'

      };
      this.pieData = [
          { x: 'Used', y: 5, text: '10 pils' }, { x: 'Available', y: 15, text: '30 pils' }
      ];
      this.pieData1 = [
          { x: 'Taked', y: 10, text: '10 days' }, { x: 'Missed', y: 2, text: '2 day' },
          { x: 'Left', y: 8, text: '8 days' }
      ];
      this.startAngle = 0;
      this.endAngle = 360;
      this.radius = 'r';
      this.enableAnimation = true;
      this.title = 'Treatment(Alergy) Progress';
      this.statsTitle = 'Medication Usage';
      this.legendSettings = {
          visible: true, position: 'Top'
      };
      this.tooltipThreatment = {
          enable: true, header: '', format: '${point.x} : <b>${point.y} day(s)</b>'
      }

      this.tooltipMedication = {
          enable: true
      }
      this.palette = ["#2EF117", "#1AB6F1", "#6FAAB0", "#FF33F3", "#228B22", "#3399FF"]

      this.chartData = [
          { Medication: "Cetirizine", FullCourse: 110, Available: 50, Used: 45, DosePerDay: 3 },
          { Medication: "Loratadine", FullCourse: 80, Available: 10, Used: 55, DosePerDay: 4 },
          { Medication: "Deslodine", FullCourse: 100, Available: 60, Used: 50, DosePerDay: 2 },
          { Medication: "Fexonadine ", FullCourse: 60, Available: 36, Used: 40, DosePerDay: 3 }
          
      ];
      this.primaryXAxis = {
          valueType: 'Category',
          title: 'Medications stats'
      };
      this.primaryYAxis = {
          minimum: 0, maximum: 120,
          interval: 5, title: 'Pills/Doses'
      };
  }
}
