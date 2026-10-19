import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TvShowInfoComponent} from './tv-show-info.component';

describe('TvShowInfoComponent', () => {
  let component: TvShowInfoComponent;
  let fixture: ComponentFixture<TvShowInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvShowInfoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tvShow', {
      created_by: [],
      networks: [],
      status: 'Ended',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
