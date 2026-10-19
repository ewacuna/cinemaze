import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {filter} from 'rxjs';

import {INavbarLink} from '../../models';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.component.scss',
  host: {'(document:keydown.escape)': 'closeMenu(true)'},
})
export class NavbarComponent {
  private readonly menuToggle =
    viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  public readonly appTitle = 'Cinemaze';
  public readonly isMenuOpen = signal(false);
  public readonly navbarLinks: readonly INavbarLink[] = [
    {path: '/home', label: 'Home'},
    {path: '/movies', label: 'Movies'},
    {path: '/tv-shows', label: 'TV Shows'},
  ];

  constructor() {
    inject(Router)
      .events.pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.closeMenu());
  }

  public toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
  }

  public closeMenu(restoreFocus = false): void {
    if (!this.isMenuOpen()) return;
    this.isMenuOpen.set(false);
    if (restoreFocus) this.menuToggle()?.nativeElement.focus();
  }
}
