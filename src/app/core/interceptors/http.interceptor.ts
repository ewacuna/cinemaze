import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {from, lastValueFrom, Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const skipIntercept: boolean = req.headers.get('skip') === 'true';

  if (skipIntercept) {
    req = req.clone({
      headers: req.headers.delete('skip'),
    });
    return next(req);
  }

  return from(handle(req, next));
};

const getUrl = (request: HttpRequest<unknown>): string => {
  const fullUrl: string = request.url.replace(environment.theMovieDBURL, '');
  const url: string = fullUrl.replace(/^\//, '');
  return `${environment.theMovieDBURL}/${url}`;
};

const handle = async (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  req = req.clone({
    url: getUrl(req),
  });

  return await lastValueFrom(next(req));
};
