import { Component, OnInit } from '@angular/core';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import { Message } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  websocket: WebSocketSubject<any>;
  url: string;
  messages: Message[] = [];
  message: string;

  constructor () {
  }

  ngOnInit () {
  }

  connect () {
    this.websocket = null;
    this.websocket = WebSocketSubject.create(this.url);
    this.websocket.subscribe(x => {
      this.messages = this.messages.concat({text: x});
    });
  }

  send () {
    this.websocket.next(this.message);
    this.messages = this.messages.concat({text: this.message, sent: true});
    this.message = null;
  }
}
