import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
    public pieData!: Object[];
    public pieData1!: Object[];
    public startAngle!: number;
    public endAngle!: number;
    public center!: Object;
    public explode!: boolean;
    public enableAnimation!: boolean;
    public title!: string;
    public title1!: string;
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
    public size!:Object;

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
        this.title = 'Treatment Progress';
        this.title1 = 'Medication Usage';
        this.title2 = 'Treatment Progress';
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
            { Medication: "Medication1", FullCourse: 110, Available: 50, Used: 45, DosePerDay: 3 },
            { Medication: "Medication2", FullCourse: 80, Available: 10, Used: 55, DosePerDay: 4 },
            { Medication: "Medication3", FullCourse: 100, Available: 60, Used: 50, DosePerDay: 2 },
            { Medication: "Medication4", FullCourse: 60, Available: 36, Used: 40, DosePerDay: 3 },
            { Medication: "Medication5", FullCourse: 70, Available: 45, Used: 35, DosePerDay: 4 },
            { Medication: "Medication6", FullCourse: 100, Available: 80, Used: 30, DosePerDay: 3 },
            { Medication: "Medication7", FullCourse: 20, Available: 15, Used: 4, DosePerDay: 1 },
            { Medication: "Medication8", FullCourse: 90, Available: 75, Used: 10, DosePerDay: 5 }
        ];
        this.primaryXAxis = {
            valueType: 'Category',
            title: 'Medication'
        };
        this.primaryYAxis = {
            minimum: 0, maximum: 120,
            interval: 5, title: 'Pills/Doses'
        };
        this.size = { width: '300'}
    }
}
