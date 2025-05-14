import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>(); // Must be type string

  onSelected(feature: string) {
    this.selectedFeatureEvent.emit(feature); // Emit a string like 'documents'
  }
}
