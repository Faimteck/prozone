import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	base: any;
	statusName: any = 'Daily';
  dashboardData: any = [
    {
      path: '/category',
      label: 'category',
      count: 10,
      class: 'card-header-warning'
    },
    {
      path: '/sub-category',
      label: 'Sub categories',
      count: 30,
      class: 'card-header-success'
    },
    {
      path: '/application-form',
      label: 'Applications',
      count: 45,
      class: 'card-header-danger'
    },
    {
      path: '/application-form',
      label: 'Active Applications',
      count: 15,
      class: 'card-header-info'
    },
    {
      path: '/application-form',
      label: 'Completed Applications',
      count: 42,
      class: 'card-header-primary'
    },
    {
      path: '/application-form',
      label: 'Pending Applciations',
      count: 60,
      class: 'card-header-warning'
    }
  ];

  status = [
    {
      id: 1,
      name: 'Daily'
    },
    {
      id: 2,
      name: 'Weekly'
    },
    {
      id: 3,
      name: 'Monthly'
    }
  ]

  constructor() { }
  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.loadChart();
  }

  loadChart(){
    let dataDailySalesChart: any = {};
    if(this.statusName == 'Daily'){
      dataDailySalesChart = {
        labels: ['Jun 29', 'Jun 30', 'Jul 1', 'Jul 2 ', 'Jul 3', 'Jul 4', 'Jul 5'],
        series: [
          [12, 17, 7, 17, 23, 18, 38]
        ]
      };
    }
    else if(this.statusName == 'Weekly'){
      dataDailySalesChart = {
        labels: ['Jun 29', 'Jul 6', 'Jul 13', 'Jul 20 ', 'Jul 27'],
        series: [
          [20, 35, 15, 5, 23]
        ]
      };
    }
    else{
      dataDailySalesChart = {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        series: [
          [12, 17, 7, 17, 23, 18, 38, 50, 40, 15, 10, 25]
        ]
      };
    }
    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }
    var dailySalesChart1 = new Chartist.Line('#dailySalesChart1', dataDailySalesChart, optionsDailySalesChart);
    var dailySalesChart2 = new Chartist.Line('#dailySalesChart2', dataDailySalesChart, optionsDailySalesChart);
    var dailySalesChart3 = new Chartist.Line('#dailySalesChart3', dataDailySalesChart, optionsDailySalesChart);
    this.startAnimationForLineChart(dailySalesChart1);
    this.startAnimationForLineChart(dailySalesChart2);
    this.startAnimationForLineChart(dailySalesChart3);
  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;
    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });
    seq = 0;
  };
}
