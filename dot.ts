import {
  defer,
  fromEvent,
  animationFrames,
  mergeMap,
  tap,
  takeWhile,
  scan,
  finalize,
} from 'rxjs';
import { CLICK_EVT_NAME, MOUSEMOVE_EVT_NAME } from './constants';

const EXAMPLE_ID = 'example-5';

fromEvent(document.getElementById(EXAMPLE_ID), CLICK_EVT_NAME).subscribe(() => {
  // When the mouse moves, add animated dots to the screen.
  fromEvent(document, MOUSEMOVE_EVT_NAME)
    .pipe(mergeMap((e: MouseEvent) => addDot(e.pageX, e.pageY)))
    .subscribe();

  function addDot(x: number, y: number) {
    return defer(() => {
      // Create and add the dot element when
      // the observable is subscribed to
      const dot = document.createElement('div');
      dot.setAttribute(
        'style',
        `
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      background-color: lime;
      border-radius: 50%;
      transform: translate3d(${x}px, ${y}px, 0);
    `
      );
      document.body.append(dot);

      const xVelocity = Math.random() * 2 - 1;
      const yVelocity = Math.random() * 2 - 1;

      return animationFrames().pipe(
        // Only take animation frames for 1 second.
        takeWhile(({ elapsed }) => elapsed < 1000),

        // Track and update the current position.
        scan(
          ({ x: xCurrent, y: yCurrent }) => ({
            x: xCurrent + xVelocity,
            y: yCurrent + yVelocity,
          }),
          { x, y }
        ),

        // Set the position on the dot as a side-effect.
        tap(({ x, y }) => {
          dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }),

        // When we clean up, remove the element.
        finalize(() => {
          dot.remove();
        })
      );
    });
  }
});
