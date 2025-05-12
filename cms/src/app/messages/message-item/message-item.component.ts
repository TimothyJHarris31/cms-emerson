import { Component, Input } from '@angular/core';
import { Message } from '../message.model';  // Import the Message model

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message!: Message;  // Use the Message model as input
}
