import {HttpInterceptorFn} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.get('skip') === 'true') {
    return next(req.clone({headers: req.headers.delete('skip')}));
  }

  const path = req.url
    .replace(environment.theMovieDBURL, '')
    .replace(/^\//, '');
  // Keep the HTTP observable intact so unsubscribe aborts the network request.
  return next(req.clone({url: `${environment.theMovieDBURL}/${path}`}));
};
