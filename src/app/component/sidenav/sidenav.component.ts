import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isAdmin: boolean = false;

  ngOnInit() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin'; 
  }
  logout() {
    

  }
}
