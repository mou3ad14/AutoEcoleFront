import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../service/clientService/client.service';
import { Client } from '../../model/client';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClientDetailsDialogComponent } from '../client-details-dialog/client-details-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Client>([]);
  displayedColumns: string[] = ['nom', 'prenom', 'cin', 'telephone', 'actions'];
  isAdmin: boolean = false;
  totalItems: number = 0;
  searchCin: string = '';
  searchNom: string = '';
  searchPrenom: string = '';
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'ADMIN';
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.loadClients();
  }

  loadClients() {
    const page = this.paginator ? this.paginator.pageIndex : 0;
    const size = this.paginator ? this.paginator.pageSize : 10;
    let sort = '';
    if (this.sort.active && this.sort.direction) {
      sort = `${this.sort.active},${this.sort.direction}`;
    }
    this.clientService.getClients(page, size, sort).subscribe((response) => {
      this.dataSource.data = response.content;
      this.totalItems = response.totalElements;
    });
  }

  onUpdateClient(cin: string): void {
    this.router.navigate(['/clients/update', cin]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchCin = filterValue.trim().toLowerCase();
  }
  searchClients() {
    if (this.searchCin) {
      this.searchClientByCin();
    } else if (this.searchNom || this.searchPrenom) {
      this.clientService.searchClients(this.searchNom, this.searchPrenom).subscribe(
        (clients) => {
          this.dataSource.data = clients;
          this.totalItems = clients.length;
        },
        (error) => {
          console.error('Error searching clients', error);
          this.dataSource.data = [];
          this.totalItems = 0;
        }
      );
    } else {
      this.loadClients();
    }
  }

  searchClientByCin() {
    if (this.searchCin) {
      this.clientService.getClientById(this.searchCin).subscribe(
        (client) => {
          this.dataSource.data = [client];
          this.totalItems = 1;
        },
        (error) => {
          console.error('Client not found', error);
          this.dataSource.data = [];
          this.totalItems = 0;
        }
      );
    } else {
      this.loadClients();
    }
  }

  onViewClientDetails(cin: string): void {
    const agencePaiementFromLocalStorage = localStorage.getItem('agence');
   
    this.clientService.getClientById(cin).subscribe((clientData) => {
      const agencePaiement = this.isAdmin ? clientData.agence.id : agencePaiementFromLocalStorage;
      const dataToSend = { ...clientData, agencePaiement };
      console.log(dataToSend);
      this.dialog.open(ClientDetailsDialogComponent, {
        data: dataToSend,
        width: '400px'
      });
    });
  }
}