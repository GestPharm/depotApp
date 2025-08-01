import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { NgApexchartsModule } from "ng-apexcharts";
import { Transaction } from '../models/transaction.model';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TransactionService } from '../services/transaction.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TransactionType } from '../models/generics';


export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgApexchartsModule, NgxPaginationModule, FontAwesomeModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{



  @ViewChild("chart") chart: ChartComponent| undefined;
  public chartOptions: ChartOptions;

  @ViewChild("chart1") chart1: ChartComponent| undefined;
  public chartOptions1: ChartOptions1;


  transactions: Transaction[] = [];

  page: number = 1; 
  
    // Configuration des labels de pagination en français
    paginationLabels = {
      previousLabel: 'Préc.',
      nextLabel: 'Suiv.',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `Vous êtes sur la page`
    };
  
      faTrash= faTrash;
        faPen = faPen;
        faEye= faEye;
        

   constructor(private transactionService: TransactionService) {

    this.chartOptions = {
      series: [44, 55, 13],
      chart: {
        type: "donut",
        width: 400, // Set the width of the chart
        height: 400 // S
      },
      labels: ["Entrée", "Sortie", "Retour"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
              height: 400 
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };


    this.chartOptions1 = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 280,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Evolution des transactions par mois",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Avr",
          "Mai",
          "Jui",
          "Juil",
          "Aout",
          "Sept"
        ]
      }
    };


    }

   ngOnInit() {
      this.loadDataSource();
   }

   loadDataSource (){

    this.transactionService.getAllTransaction().subscribe(data => {

      this.transactions = data;

      //this.filteredTransactions = of([...this.transactions]);
    });

  }

  getTransactionTypeLabel(arg0: string|undefined) {
    return arg0 ? TransactionType[arg0 as keyof typeof TransactionType] : '';
  }
  

   



}
