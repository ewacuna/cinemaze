import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowInfoComponent } from './tv-show-info.component';

describe('TvShowInfoComponent', () => {
  let component: TvShowInfoComponent;
  let fixture: ComponentFixture<TvShowInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvShowInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
