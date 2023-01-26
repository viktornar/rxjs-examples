import { Subject, fromEvent } from 'rxjs';
import { CLICK_EVT_NAME } from './constants';

// Observables are unicast by design and Subjects are multicast by design.
const pizza$ = new Subject<number>();
let slices = 10;

pizza$.next(slices);

pizza$.subscribe((sliceCount) => {
  if (sliceCount <= 0) {
    alert('No more pizza left');
  }
  alert(`Only ${sliceCount} slices left!`);
});

fromEvent(document.getElementById('example-3'), CLICK_EVT_NAME).subscribe(
  () => {
    pizza$.next(--slices);
  }
);
