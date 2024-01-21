import {Component, inject, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {initFlowbite} from 'flowbite';
import {filter} from 'rxjs';

import {BodyComponent, NavbarComponent} from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  // Services
  private viewportScroller: ViewportScroller = inject(ViewportScroller);
  private router: Router = inject(Router);

  // Properties
  public title = 'Cinemaze';

  ngOnInit(): void {
    initFlowbite();
    this.subscribeToRouterEvents();
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((): void => {
        this.scrollToTop();
      });
  }

  private scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
