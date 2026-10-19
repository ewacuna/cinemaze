import {provideHttpClient, withXhr} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter} from '@angular/router';
import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewAllComponent} from './view-all.component';

describe('ViewAllComponent', () => {
  let component: ViewAllComponent;
  let fixture: ComponentFixture<ViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(withXhr()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
