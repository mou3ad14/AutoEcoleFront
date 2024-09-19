import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isAdmin: boolean = false;
  agence: any =0;
  constructor(private router: Router) {}


  ngOnInit() {
    const role = localStorage.getItem('role');
    const agence = localStorage.getItem('agence');
    this.isAdmin = role === 'ADMIN'; 
    this.agence = agence;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
