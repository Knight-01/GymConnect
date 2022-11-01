import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from '../_services/account.service';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  messageThread: Message[];
  pagination: Pagination;
  container = "Outbox";
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  user: User;
  userParams: UserParams;
  messageContent: string;

  constructor(private messageService: MessageService,
    private confirmService: ConfirmService,
    private accountService: AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
        this.userParams = new UserParams(user);
      })
     }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber,this.pageSize, this.container).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
      this.loading = false;
    })
  }

  deleteMessage(id: number) {
    this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result => {
      if (result) {
        this.messageService.deleteMessage(id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        })
      }
    })
  }

  getMessageThread(user: any) {
    this.messageService.getMessageThread(user).subscribe(messageThread => {
      this.messageThread = messageThread;
    })
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMessages();
    }

  }

}
