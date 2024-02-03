import { Inject, Injectable } from '@nestjs/common';

import { DB_COLLECTION_PROVIDER } from '../../core/constants';
import { FirestoreCollectionService } from '../../core/providers/firestore';

import { User } from './enitites';

@Injectable()
export class UserService {
  constructor(
    @Inject(DB_COLLECTION_PROVIDER.USERS)
    private readonly collection: FirestoreCollectionService<User>,
  ) {}

  /**
   * Asynchronously retrieves a user by ID from the database.
   * @param {string} id - the ID of the user to retrieve
   * @return {Promise<User>} the user object retrieved from the database
   */
  public async getUser(id: string): Promise<User> {
    return await this.collection.getDoc(id);
  }

  /**
   * Retrieves all users from the database.
   * @return {Promise<User[]>} Promise that resolves with an array of User objects
   */
  public async getUsers(): Promise<User[]> {
    return await this.collection.getDocs();
  }

  /**
   * Add a new user to the database.
   * @param {Partial<User>} user - the user object to be added
   * @return {Promise<string>} the ID of the newly added user
   */
  public async addUser(user: Partial<User>): Promise<User> {
    return await this.collection.addDoc(user);
  }

  /**
   * Updates a user in the database.
   * @param {Partial<User> & { id: string }} user - the user object to update with ID
   * @return {Promise<User>} the updated user object
   */
  public async updateUser(user: Partial<User> & { id: string }): Promise<User> {
    return await this.collection.updateDoc(user);
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to be deleted
   * @return {Promise<User>} A promise that resolves with the deleted user
   */
  public async deleteUser(id: string): Promise<User> {
    return await this.collection.deleteDoc(id);
  }
}
