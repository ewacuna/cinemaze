import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTvCardComponent } from './movie-tv-card.component';

describe('MovieTvCardComponent', () => {
  let component: MovieTvCardComponent;
  let fixture: ComponentFixture<MovieTvCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTvCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieTvCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
