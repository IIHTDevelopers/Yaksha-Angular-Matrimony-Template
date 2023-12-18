import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  age: number;
  gender: string;
  occupation: string;
}

@Component({
  selector: 'app-matrimony',
  templateUrl: './matrimony.component.html',
  styleUrls: ['./matrimony.component.css']
})
export class MatrimonyComponent {
  users: User[] = [];
  newUser: User = {} as User;
  editedUser: User = {} as User;
  isEditing = false;
  searchKeyword = '';

  constructor() { }

  addUser(): void {
  }

  editUser(user: User): void {
  }

  saveEditedUser(): void {
  }

  cancelEdit(): void {
  }

  deleteUser(user: User): void {
  }

  get filteredUsers(): User[] {
    return [];
  }
}
