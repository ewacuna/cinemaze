import {Component, ChangeDetectionStrategy} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-body',
  imports: [RouterOutlet],
  templateUrl: './body.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``,
})
export class BodyComponent {}
