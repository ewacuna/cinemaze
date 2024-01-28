import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {INavbarLink} from '../../models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  // Properties
  public appTitle = 'Cinemaze';
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
