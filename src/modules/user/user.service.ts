import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/core/providers';

import { DatabaseCollection } from '../../core/constants';

import { User } from './enitites';

@Injectable()
export class UserService {
  constructor(private readonly firestore: FirestoreService) {}

  /**
   * Asynchronously retrieves a user by ID from the database.
   * @param {string} id - the ID of the user to retrieve
   * @return {Promise<User>} the user object retrieved from the database
   */
  public async getUser(id: string): Promise<User> {
    return await this.firestore.getDoc(DatabaseCollection.USER, id);
  }

  /**
   * Retrieves all users from the database.
   * @return {Promise<User[]>} Promise that resolves with an array of User objects
   */
  public async getUsers(): Promise<User[]> {
    return await this.firestore.getDocs(DatabaseCollection.USER);
  }

  /**
   * Add a new user to the database.
   * @param {User} newUser - the user object to be added
   * @return {Promise<string>} the ID of the newly added user
   */
  public async addUser(user: Partial<User>): Promise<User> {
    return await this.firestore.addDoc(DatabaseCollection.USER, user);
  }

  public async updateUser(user: Partial<User>): Promise<User> {
    return await this.firestore.updateDoc(DatabaseCollection.USER, user.id, user);
  }
}
