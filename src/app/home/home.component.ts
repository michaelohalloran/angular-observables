import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  myNumberSubscription: Subscription;
  myCustomSubscription: Subscription;


  constructor() { }

  ngOnInit() {

    const myNumbers = interval(1000)
      .pipe(map((data: number) => {
          return data * 8;
        })
      );
    this.myNumberSubscription = myNumbers.subscribe(
      (number: number) => {
        console.log('number: ', number);
      }
    )  

    const myObservable = Observable.create((observer: Observer<string>)=> {
      setTimeout(()=> {
        observer.next('first package');
      },2000);

      setTimeout(()=> {
        observer.next('second package');
      }, 4000);

      setTimeout(()=> {
        // observer.error('error');
        observer.complete();
      }, 5000);
    });

    this.myCustomSubscription = myObservable.subscribe(
      (data: string) => {console.log('data: ', data);},
      (error: string) => {console.log('error: ', error);},
      () => {console.log('completed');}

    )
  }

  ngOnDestroy() {
      this.myCustomSubscription.unsubscribe();
      this.myNumberSubscription.unsubscribe();
  }

}
