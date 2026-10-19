import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``,
})
export class NotFoundComponent {}
