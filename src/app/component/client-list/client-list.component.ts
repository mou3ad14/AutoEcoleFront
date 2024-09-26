import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../service/clientService/client.service';
import { Client } from '../../model/client';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ClientDetailsDialogComponent } from '../client-details-dialog/client-details-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  dataSource = new MatTableDataSource<Client>([]);
  displayedColumns: string[] = ['nom', 'prenom', 'cin', 'telephone', 'actions'];
  isAdmin: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private dialog: MatDialog    ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
      this.dataSource.data = data;
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'admin';
    });
  }

  onUpdateClient(cin: string): void {
    this.router.navigate(['/clients/update', cin]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();    }

    onViewClientDetails(cin: string): void {
      this.clientService.getClientById(cin).subscribe((clientData) => {
        this.dialog.open(ClientDetailsDialogComponent, {
          data: clientData,
          width: '400px'
        });
      });
    }
}
