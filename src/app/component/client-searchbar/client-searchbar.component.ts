import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-client-searchbar',
  templateUrl: './client-searchbar.component.html',
  styleUrls: ['./client-searchbar.component.css']
})
export class ClientSearchbarComponent {
  @Output() searchChanged = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<string>();

  cinOptions: string[] = []; 
  onSearchChange(event: any): void {
    const searchTerm = event.target.value;
    this.searchChanged.emit(searchTerm);
  }

  onFilterChange(cin: string): void {
    this.filterChanged.emit(cin);
  }
}
