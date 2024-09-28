// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { ClientDataService } from '../../service/userDataService/client-data.service';
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
//         this.dataSource.data = data;        },
//       (error) => {
//         console.error('Error fetching users', error);
//       }
//     );
//   }

//   deleteUser(user: User): void {
//     this.clientdata.deleteUserById(user.email).subscribe(
//       () => {
//                 this.dataSource.data = this.dataSource.data.filter(u => u !== user);
//       },
//       (error) => {
//         console.error('Error deleting user', error);
//       }
//     );
//   }
// }



import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientDataService } from '../../service/userDataService/client-data.service';
import { User } from '../../model/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Import your dialog component

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();

  constructor(private clientdata: ClientDataService, private dialog: MatDialog) {}
  users: User[] = [];

  ngOnInit(): void {
    this.clientdata.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        firstname: user.firstname,
        lastname: user.lastname
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.clientdata.deleteUserById(user.email).subscribe(
          () => {
            this.dataSource.data = this.dataSource.data.filter(u => u !== user);
          },
          (error) => {
            console.error('Error deleting user', error);
          }
        );
      }
    });
  }
  

  isAdmin(user: User): boolean {
    return user.role === 'ADMIN'; 
  }
}
