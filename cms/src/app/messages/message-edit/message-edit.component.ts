import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  // Local reference to the input elements
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgTextInputRef!: ElementRef;

  // Emit event to parent
  @Output() messageAdded = new EventEmitter<Message>();

  currentSender = 'Your Name'; // Change this to your actual name

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;

    if (!subject || !msgText) return; // Simple validation

    const newMessage = new Message(
      Math.random().toString(), // Hardcoded/random id
      subject,
      msgText,
      this.currentSender
    );

    this.messageAdded.emit(newMessage); // Emit the message to the list
    this.onClear(); // Optional: clear form after sending
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
