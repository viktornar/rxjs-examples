import { fromEvent, exhaustMap, interval, take } from 'rxjs';

// Ensure that a new click event will not be handled till wi not finish generating 5 numbers.
const clicks = fromEvent(document, 'click');
const result = clicks.pipe(exhaustMap(() => interval(1000).pipe(take(5))));
result.subscribe((x) => console.log(x));
