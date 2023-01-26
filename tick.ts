import {
  fromEvent,
  Observable,
  Subscriber,
  Subscription,
  interval,
  take,
  skip,
} from 'rxjs';
import { CLICK_EVT_NAME } from './constants';

const observable1$ = new Observable((state: Subscriber<number>) => {
  let counter = 1;
  const pid = setInterval(() => {
    if (counter > 60) {
      clearInterval(pid);
      state.complete();
    }
    state.next(counter++);
  }, 1000);
});

const subscriber1 = (data: number) => {
  console.log('Tick: ', data);
};

const observable2$ = new Observable((state) => {
  let counter = 1;
  const pid = setInterval(() => {
    try {
      if (counter > 60) {
        clearInterval(pid);
        state.complete();
      }

      state.next(counter++);
    } catch (err) {
      state.error(err);
    }
  }, 1000);
});

const subscriber2 = (data: number) => {
  console.log('Tick 2: ', data);
};

// Simpler approach
const observable3$ = interval(1000).pipe(take(60));

const exampleFromEvent$ = fromEvent(
  document.getElementById('example-2'),
  CLICK_EVT_NAME
);

let sub1: Subscription, sub2: Subscription, sub3: Subscription;
let th;

exampleFromEvent$.subscribe(() => {
  console.clear();
  if (sub1) sub1.unsubscribe();
  if (sub2) sub2.unsubscribe();
  if (sub3) sub3.unsubscribe();
  if (th) clearTimeout(th);

  sub1 = observable1$.subscribe(subscriber1);
  sub2 = observable2$.subscribe(subscriber2);
  sub3 = observable3$.subscribe((tick) => console.log('Tick 3', ++tick));

  th = setTimeout(() => {
    sub2.unsubscribe();
  }, 3000);
});
