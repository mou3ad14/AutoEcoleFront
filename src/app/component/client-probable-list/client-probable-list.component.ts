// import { Component } from '@angular/core';
// import { ClientProbable } from 'src/app/model/clientProbable';
// import { ClientProbableService } from 'src/app/service/clientProbableService/client-probable.service';

// @Component({
//   selector: 'app-client-probable-list',
//   templateUrl: './client-probable-list.component.html',
//   styleUrls: ['./client-probable-list.component.css']
// })
// export class ClientProbableListComponent {
//   clientProbables: ClientProbable[] = [];
//   displayedColumns: string[] = ['fullName', 'phoneNumber', 'categorieDemandee', 'dateVisite', 'heureVisite', 'commentaire'];

//   constructor(private clientProbableService: ClientProbableService) {}

//   ngOnInit(): void {
//     this.clientProbableService.getClientProbables().subscribe(data => {
//       this.clientProbables = data;
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientProbableService } from 'src/app/service/clientProbableService/client-probable.service';
import { ClientProbable } from 'src/app/model/clientProbable';

@Component({
  selector: 'app-client-probable-list',
  templateUrl: './client-probable-list.component.html',
  styleUrls: ['./client-probable-list.component.css']
})
export class ClientProbableListComponent implements OnInit {
  clients: ClientProbable[] = [];
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'categorieDemandee', 'dateVisite', 'heureVisite', 'commentaire', 'actions'];

  constructor(
    private clientProbableService: ClientProbableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  // Load all client probables
  loadClients() {
    this.clientProbableService.getClientProbables().subscribe((data: ClientProbable[]) => {
      this.clients = data;
    });
  }

  // Navigate to add new client
  addClient() {
    this.router.navigate(['/client-probable-form']);
  }

  // Navigate to edit a client
  editClient(id: number) {
    this.router.navigate([`/client-probable-form/${id}`]);
  }
}
