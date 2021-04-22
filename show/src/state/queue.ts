import { Subject, timer } from "rxjs";
import { concatMap, ignoreElements, startWith } from "rxjs/operators";
import { events$ } from "./socket";

// limit events frequency to max 5s
const INTERVAL = 5000 

const queue = new Subject()

export const queue$ = queue.pipe(
  concatMap(value => timer(INTERVAL).pipe(
    ignoreElements(),
    startWith(value)
  ))
)

events$.subscribe(queue.next)
