import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '../message.model';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';

@Component({
  selector: 'cms-message-list',
  standalone: true,
  imports: [CommonModule, MessageItemComponent, MessageEditComponent],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Welcome!', 'Hello and welcome to the messaging app!', 'Alice'),
    new Message('2', 'Lunch?', 'Do you want to grab lunch at noon?', 'Bob'),
    new Message('3', 'Reminder', 'Don’t forget our meeting at 3 PM.', 'Charlie')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
