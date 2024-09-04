import { Component } from '@angular/core';
import { ClientProbable } from 'src/app/model/clientProbable';
import { ClientProbableService } from 'src/app/service/clientProbableService/client-probable.service';

@Component({
  selector: 'app-client-probable-list',
  templateUrl: './client-probable-list.component.html',
  styleUrls: ['./client-probable-list.component.css']
})
export class ClientProbableListComponent {
  clientProbables: ClientProbable[] = [];
  displayedColumns: string[] = ['fullName', 'phoneNumber', 'categorieDemandee', 'dateVisite', 'heureVisite', 'commentaire'];

  constructor(private clientProbableService: ClientProbableService) {}

  ngOnInit(): void {
    this.clientProbableService.getClientProbables().subscribe(data => {
      this.clientProbables = data;
    });
  }
}
