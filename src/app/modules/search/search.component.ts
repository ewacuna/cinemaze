import {Component, OnInit, inject} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  // Services
  private titleService: Title = inject(Title);

  ngOnInit(): void {
    this.titleService.setTitle('Cinemaze | Search');
  }
}
