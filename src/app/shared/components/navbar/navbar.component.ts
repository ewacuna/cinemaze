import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {INavbarLink} from '../../models';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // Properties
  public appTitle = 'Cinemaze';
  public isMenuOpen = false;
  public navbarLinks: INavbarLink[] = [
    {
      path: 'home',
      label: 'Home',
    },
    {
      path: 'search',
      label: 'Search',
    },
    {
      path: 'movies',
      label: 'Movies',
    },
    {
      path: 'tv-shows',
      label: 'TV Shows',
    },
  ];
}
