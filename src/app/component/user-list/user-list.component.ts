import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {User} from '../../model/user'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([
    { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', role: 'Admin' },
    { firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com', role: 'User' },
    { firstname: 'Alice', lastname: 'Johnson', email: 'alice.johnson@example.com', role: 'Moderator' }
  ]);

  deleteUser(user: User): void {
    this.dataSource.data = this.dataSource.data.filter(u => u !== user);
  }
}
