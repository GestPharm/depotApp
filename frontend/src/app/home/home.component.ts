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
import { ProduitService } from '../services/produit.service';


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
  public chartOptions: any;

  @ViewChild("chart1") chart1: ChartComponent| undefined;
  public chartOptions1: any;


  transactions: Transaction[] = [];

  page: number = 1; 

  stockFaibleCount: number = 0;
  
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
      
      ventesMois: string|number = 0;
        

   constructor(private transactionService: TransactionService, private produitService: ProduitService) {}

   ngOnInit() {
      this.loadDataSource();
      this.loadStockFaible();
      this.loadVentesMois();
      this.loadTransactionStats();
      this.loadVentesParMois();
   }

   loadDataSource (){

    this.transactionService.getAllTransaction().subscribe(data => {

      this.transactions = data;

      //this.filteredTransactions = of([...this.transactions]);
    });

  }

  loadStockFaible(): void {
    this.produitService.getStockFaible().subscribe({
      next: (data) => this.stockFaibleCount = data,
      error: (err) => console.error('Erreur stock faible:', err)
    });
  }

  loadVentesMois(): void {
    this.transactionService.getVentesDuMois().subscribe({
      next: (data) => this.ventesMois = data,
      error: (err) => console.error('Erreur KPI ventes du mois', err)
    });
  }

  loadTransactionStats(): void {
  this.transactionService.getTransactionStats().subscribe(stats => {
    this.chartOptions = {
      series: [
        stats.ENTREE || 0,
        stats.SORTIE || 0,
        stats.RETOUR || 0
      ],
      chart: {
        type: "donut",
        width: 400,
        height: 400
      },
      labels: ["Entrée", "Sortie", "Retour"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
              height: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  });
}

loadVentesParMois(): void {
  this.transactionService.getVentesParMois().subscribe(stats => {
    // On reconstruit un tableau de janvier à décembre
    const data = [];
    for (let m = 1; m <= 12; m++) {
      data.push(stats[m] || 0);
    }

    this.chartOptions1 = {
      series: [
        {
          name: "Ventes",
          data: data
        }
      ],
      chart: {
        height: 280,
        type: "line",
        zoom: { enabled: false }
      },
      dataLabels: { enabled: false },
      stroke: { curve: "straight" },
      title: {
        text: "Évolution des ventes par mois",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [
          "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
          "Juil", "Août", "Sept", "Oct", "Nov", "Déc"
        ]
      }
    };
    });
  }

  getTransactionTypeLabel(arg0: string|undefined) {
    return arg0 ? TransactionType[arg0 as keyof typeof TransactionType] : '';
  }
  

   



}
