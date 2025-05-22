import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  standalone: false,
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private messagesChangedSubscription!: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    this.messagesChangedSubscription = this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  ngOnDestroy(): void {
    this.messagesChangedSubscription.unsubscribe();
  }
}
