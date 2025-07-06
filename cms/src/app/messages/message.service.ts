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
  private messagesUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {}

  getMessages() {
    this.http.get<Message[]>(this.messagesUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages ? messages : [];
        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
        this.messageListChangedEvent.next(this.messages.slice());
      },
      error => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  getMessage(id: string): Message | undefined {
    return this.messages.find(msg => msg.id === id);
  }

  addMessage(newMessage: Message) {
    if (!newMessage) return;

    newMessage.id = ''; // Server will assign unique id

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string; createdMessage: Message }>(this.messagesUrl, newMessage, { headers })
      .subscribe(
        (response) => {
          this.messages.push(response.createdMessage);
          this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error => {
          console.error('Error adding message:', error);
        }
      );
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) return;

    const pos = this.messages.findIndex(m => m.id === originalMessage.id);
    if (pos < 0) return;

    newMessage.id = originalMessage.id;
    newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`${this.messagesUrl}/${originalMessage.id}`, newMessage, { headers })
      .subscribe(
        () => {
          this.messages[pos] = newMessage;
          this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error => {
          console.error('Error updating message:', error);
        }
      );
  }

  deleteMessage(message: Message) {
    if (!message) return;

    const pos = this.messages.findIndex(m => m.id === message.id);
    if (pos < 0) return;

    this.http.delete(`${this.messagesUrl}/${message.id}`)
      .subscribe(
        () => {
          this.messages.splice(pos, 1);
          this.messageListChangedEvent.next(this.messages.slice());
        },
        error => {
          console.error('Error deleting message:', error);
        }
      );
  }
}
