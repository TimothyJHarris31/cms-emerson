import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number = 0;
  private messagesUrl = 'https://your-firebase-url/messages.json';

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http.get<Message[]>(this.messagesUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages ? messages : [];
        this.maxMessageId = this.getMaxId();

        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));

        this.messageListChangedEvent.next(this.messages.slice());
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  storeMessages() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const messagesString = JSON.stringify(this.messages);

    this.http.put(this.messagesUrl, messagesString, { headers }).subscribe(() => {
      this.messageListChangedEvent.next(this.messages.slice());
    });
  }

  getMessage(id: string): Message | undefined {
    return this.messages.find(msg => msg.id === id);
  }

  addMessage(newMessage: Message) {
    if (!newMessage) return;
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages(); 
  }

  getMaxId(): number {
    let maxId = 0;
    for (const msg of this.messages) {
      const currentId = parseInt(msg.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
}
