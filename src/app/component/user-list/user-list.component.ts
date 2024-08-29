// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { ClientDataService } from '../../service/userDataService/client-data.service'; // Adjust the path as needed
// import { User } from '../../model/user';

// @Component({
//   selector: 'app-user-list',
//   templateUrl: './user-list.component.html',
//   styleUrls: ['./user-list.component.css']
// })
// export class UserListComponent implements OnInit {
//   displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'actions'];
//   dataSource = new MatTableDataSource<User>();

//   constructor(private clientdata: ClientDataService) {}
//   users: User[] = [];

 
//   ngOnInit(): void {
//     this.clientdata.getAllUsers().subscribe(
//       (data: User[]) => {
//         this.users = data;
//       },
//       (error) => {
//         console.error('Error fetching users', error);
//       }
//     );
//   }
//   deleteUser(user: User): void {
//     this.dataSource.data = this.dataSource.data.filter(u => u !== user);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientDataService } from '../../service/userDataService/client-data.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private clientdata: ClientDataService) {}
  users: User[] = [];

  ngOnInit(): void {
    this.clientdata.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dataSource.data = data;  // Ensure the table data is updated
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteUser(user: User): void {
    this.clientdata.deleteUserById(user.email).subscribe(
      () => {
        // Remove the user from the table data
        this.dataSource.data = this.dataSource.data.filter(u => u !== user);
      },
      (error) => {
        console.error('Error deleting user', error);
      }
    );
  }
}
