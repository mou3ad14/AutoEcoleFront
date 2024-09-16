import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientDataService } from '../service/userDataService/client-data.service';

@Component({
  selector: 'app-etat-de-caisse-list',
  templateUrl: './etat-de-caisse-list.component.html',
  styleUrls: ['./etat-de-caisse-list.component.css']
})
export class EtatDeCaisseListComponent implements OnInit {
  etatDeCaisseList: any[] = []; // Define the array to hold the fetched data
  agence: number | null = null;
  todayDate: string = '';

  constructor(private http: HttpClient,     private clientDataService: ClientDataService,  ) {}

  ngOnInit(): void {
      this.fetchEtatDeCaisse();
  }

 

  fetchEtatDeCaisse(): void {
    this.clientDataService.GetEtatDeCaisseCda();
  }
}
