import { of, map, fromEvent } from 'rxjs';
import { CLICK_EVT_NAME } from './constants';

const exampleOf$ = of('World').pipe(map((name) => `Hello, ${name}!`));
exampleOf$.subscribe(console.log);

const exampleFromEvent$ = fromEvent(
  document.getElementById('example-1'),
  CLICK_EVT_NAME
);
exampleFromEvent$.subscribe((evt) => {
  alert('Hello world');
});
