import { merge, of, fromEvent } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import io from 'socket.io-client'
import { TrEvent } from './transfer';

const socket$ = of(io(`http://localhost:4000`, {
  query: {
    foo: 'bar'
  }
}))

const connect$ = socket$.pipe(
  switchMap(socket => fromEvent(socket, 'connect').pipe(
    tap(value => console.log(`connect$`, value)),
    map(() => socket)
  ))
)

// const disconnect$ = socket$.pipe(
//   switchMap(socket => fromEvent(socket, 'connect').pipe(
//     tap(console.log),
//     map(() => socket)
//   ))
// )

const listenToEvent = (event: TrEvent) => 
    connect$.pipe(
      switchMap(socket => fromEvent(socket, event))
    )

export const events$ = merge(...[TrEvent.PlayClip].map(listenToEvent))

