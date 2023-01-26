import './style.css';

import { of, map, Observable, fromEvent } from 'rxjs';

const CLICK_EVT_NAME = 'click';

// Creation observable examples
const exampleOf$ = of('World').pipe(map((name) => `Hello, ${name}!`));

exampleOf$.subscribe(console.log);

const exampleFromEvent$ = fromEvent(
  document.getElementById('example-1'),
  CLICK_EVT_NAME
);

exampleFromEvent$.subscribe((evt) => {
  alert('Hello world');
});
