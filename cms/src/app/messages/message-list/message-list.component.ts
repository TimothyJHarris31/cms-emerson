import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(
      '1',
      'Welcome!',
      'Hello and welcome to the messaging app!',
      'Alice'
    ),
    new Message('2', 'Lunch?', 'Do you want to grab lunch at noon?', 'Bob'),
    new Message(
      '3',
      'Reminder',
      'Don’t forget our meeting at 3 PM.',
      'Charlie'
    ),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
