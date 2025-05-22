import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  standalone: false,
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgTextInputRef!: ElementRef;

  currentSender = 'Your Name';

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;

    if (!subject || !msgText) return;

    const newMessage = new Message(
      Math.random().toString(),
      subject,
      msgText,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
