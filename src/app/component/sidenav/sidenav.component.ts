import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isAdmin: boolean = false;
  constructor(private router: Router) {}


  ngOnInit() {
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin'; 
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
