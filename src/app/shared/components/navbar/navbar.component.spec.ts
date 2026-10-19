import {Component} from '@angular/core';
import {provideRouter, Router} from '@angular/router';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarComponent} from './navbar.component';

@Component({template: ''})
class RouteStubComponent {}

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([
          {path: 'home', component: RouteStubComponent},
          {path: 'search', component: RouteStubComponent},
          {path: 'movies', component: RouteStubComponent},
          {path: 'movies/:id', component: RouteStubComponent},
          {path: 'tv-shows', component: RouteStubComponent},
          {path: '', redirectTo: 'home', pathMatch: 'full'},
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  function toggle(): HTMLButtonElement {
    return fixture.nativeElement.querySelector('.navbar-toggle');
  }

  function link(path: string): HTMLAnchorElement {
    return fixture.nativeElement.querySelector(`a[href="${path}"]`);
  }

  it('opens and closes with an accessible label and matching icon', () => {
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(toggle().textContent).toContain('Open menu');
    const closedIcon = toggle().querySelector('path')?.getAttribute('d');
    toggle().click();
    fixture.detectChanges();
    expect(toggle().getAttribute('aria-expanded')).toBe('true');
    expect(toggle().textContent).toContain('Close menu');
    expect(toggle().querySelector('path')?.getAttribute('d')).not.toBe(
      closedIcon
    );
    expect(
      fixture.nativeElement
        .querySelector('#main-navbar')
        .classList.contains('is-open')
    ).toBeTrue();
    toggle().click();
    fixture.detectChanges();
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes with Escape and restores focus to the mobile toggle', () => {
    // Make the mobile control focusable even when the test viewport is desktop sized.
    toggle().style.display = 'inline-flex';
    toggle().click();
    fixture.detectChanges();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})
    );
    fixture.detectChanges();
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle());
  });

  it('does not move focus when Escape is pressed with the menu closed', () => {
    link('/').focus();
    document.dispatchEvent(
      new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})
    );
    expect(document.activeElement).toBe(link('/'));
  });

  it('closes when selecting any destination or the brand, even on the current page', async () => {
    for (const path of [
      '/movies',
      '/movies',
      '/tv-shows',
      '/search',
      '/home',
      '/',
    ]) {
      toggle().click();
      fixture.detectChanges();
      link(path).click();
      fixture.detectChanges();
      expect(toggle().getAttribute('aria-expanded')).toBe('false');
      await fixture.whenStable();
    }
  });

  it('closes after programmatic navigation and updates the current page', async () => {
    await router.navigateByUrl('/home');
    toggle().click();
    fixture.detectChanges();
    await router.navigateByUrl('/search?q=Alien');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(link('/search').getAttribute('aria-current')).toBe('page');
    expect(link('/search').classList.contains('is-active')).toBeTrue();
    expect(link('/home').hasAttribute('aria-current')).toBeFalse();
  });

  it('keeps Movies active on a movie details route', async () => {
    await router.navigateByUrl('/movies/123');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(link('/movies').getAttribute('aria-current')).toBe('page');
    expect(
      fixture.nativeElement.querySelectorAll('[aria-current="page"]').length
    ).toBe(1);
  });
});
