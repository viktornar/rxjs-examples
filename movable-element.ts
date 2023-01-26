import { fromEvent, exhaustMap, takeUntil, map, merge } from 'rxjs';
import {
  CLICK_EVT_NAME,
  MOUSEDOWN_EVT_NAME,
  MOUSEMOVE_EVT_NAME,
  MOUSEUP_EVT_NAME,
} from './constants';

const EXAMPLE_ID = 'example-4';
const SQUARE_ID = 'moveable-square';

fromEvent(document.getElementById(EXAMPLE_ID), CLICK_EVT_NAME)
  .pipe(
    map(() => {
      let target = document.getElementById(SQUARE_ID);

      if (!target) {
        target = document.createElement('div');
      }

      target.setAttribute(
        'style',
        'position: absolute; top: 0; left: 0; background-color: red; width: 50px; height: 50px;'
      );
      target.setAttribute('id', SQUARE_ID);
      document.body.append(target);

      return target;
    })
  )
  .subscribe((target) => {
    fromEvent(target, MOUSEDOWN_EVT_NAME)
      .pipe(
        exhaustMap(() =>
          fromEvent(document, MOUSEMOVE_EVT_NAME).pipe(
            takeUntil(fromEvent(document, MOUSEUP_EVT_NAME))
          )
        )
      )
      .subscribe(({ pageX, pageY }: MouseEvent) => {
        target.style.transform = `translate3d(${pageX}px, ${pageY}px, 0)`;
      });
  });
