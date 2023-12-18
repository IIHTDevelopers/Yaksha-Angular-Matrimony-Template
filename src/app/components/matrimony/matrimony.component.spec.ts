import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatrimonyComponent } from './matrimony.component';

describe('MatrimonyComponent', () => {
  let component: MatrimonyComponent;
  let fixture: ComponentFixture<MatrimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatrimonyComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding a user', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(4); // Check for the number of input fields
    });

    it('should have a button for adding a user', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add User');
    });

    it('should display search input for filtering users', () => {
      const searchInput = fixture.nativeElement.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit user form when editing a user', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const editForm = fixture.nativeElement.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add a user when submitting the add user form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const sampleUser = {
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        occupation: 'Engineer',
      };

      inputFields[0].value = sampleUser.name;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = sampleUser.age;
      inputFields[1].dispatchEvent(new Event('input'));
      inputFields[2].value = sampleUser.gender;
      inputFields[2].dispatchEvent(new Event('input'));
      inputFields[3].value = sampleUser.occupation;
      inputFields[3].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.users.length).toBe(1);
      expect(component.users[0]).toEqual({
        ...sampleUser,
        id: 1,
      });
    });

    it('should have initial users array empty', () => {
      expect(component.users).not.toBeNull();
      expect(component.users).toEqual([]);
    });

    it('should add a new user', () => {
      component.newUser = {
        id: 1,
        name: 'Alice',
        age: 28,
        gender: 'Female',
        occupation: 'Teacher',
      };
      component.addUser();
      expect(component.users).not.toBeNull();
      expect(component.users.length).toBe(1);
    });

    it('should not add a user with empty fields', () => {
      component.newUser = {
        id: 0,
        name: '',
        age: 0,
        gender: '',
        occupation: '',
      };
      component.addUser();
      expect(component.users).not.toBeNull();
      expect(component.users.length).toBe(1);
    });

    it('should edit a user and update it', () => {
      component.newUser = {
        id: 1,
        name: 'Alice',
        age: 28,
        gender: 'Female',
        occupation: 'Teacher',
      };
      component.addUser();

      component.editUser(component.users[0]);
      const updatedUser = {
        id: component.users[0].id,
        name: 'Updated Name',
        age: 30,
        gender: 'Male',
        occupation: 'Engineer',
      };
      component.editedUser = { ...updatedUser };
      component.saveEditedUser();
      expect(component.users).not.toBeNull();
      expect(component.users[0]).not.toBeNull();
      expect(component.users[0]).toEqual(updatedUser);
    });

    it('should not edit a user with empty fields', () => {
      component.newUser = {
        id: 1,
        name: 'Alice',
        age: 28,
        gender: 'Female',
        occupation: 'Teacher',
      };
      component.addUser();

      component.editUser(component.users[0]);
      const originalUser = { ...component.users[0] };
      component.newUser = {
        id: originalUser.id,
        name: '',
        age: 0,
        gender: '',
        occupation: '',
      };
      component.saveEditedUser();
      expect(component.users).not.toBeNull();
      expect(component.users[0]).not.toBeNull();
      expect(component.users[0]).toEqual(originalUser);
    });

    it('should delete a user', () => {
      component.newUser = {
        id: 1,
        name: 'Alice',
        age: 28,
        gender: 'Female',
        occupation: 'Teacher',
      };
      component.addUser();

      expect(component.users).not.toBeNull();
      expect(component.users.length).toBe(1);
      component.deleteUser(component.users[0]);
      expect(component.users.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editUser({
        id: 1,
        name: 'Alice',
        age: 28,
        gender: 'Female',
        occupation: 'Teacher',
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedUser).toEqual({});
    });

    it('should filter users based on search keyword', () => {
      component.newUser = {
        id: 1,
        name: 'Alice',
        age: 28,
        gender: 'Female',
        occupation: 'Teacher',
      };
      component.addUser();

      component.searchKeyword = 'Alice';
      expect(component.filteredUsers.length).toBe(1);

      component.searchKeyword = 'John';
      expect(component.filteredUsers.length).toBe(0);
    });
  });
});
