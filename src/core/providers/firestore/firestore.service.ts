/* eslint-disable @typescript-eslint/no-explicit-any */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';
import { CollectionReference, Query } from '@google-cloud/firestore';

import { firebaseServiceAccount } from '../../configs';
import { DatabaseCollection } from '../../constants';
import { QueryFilter } from '../../entities';

@Injectable()
export class FirestoreService {
  private firestore: admin.firestore.Firestore;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseServiceAccount),
    });
    this.firestore = admin.firestore();
  }

  /**
   * Fetches a document from a specified collection and database.
   * @param collection - The name of the collection.
   * @param id - The id of the document to fetch.
   * @returns The target document.
   */
  public async getDoc(collection: DatabaseCollection, id: string): Promise<any> {
    const documentSnapshot = await this.firestore.collection(collection).doc(id).get();

    if (documentSnapshot.exists) {
      const data = documentSnapshot.data();
      if (!data.id) data.id = documentSnapshot.id;
      return data;
    }

    throw new HttpException(`The specified id (${id}) does not exist!`, HttpStatus.BAD_REQUEST);
  }

  /**
   * Retrieves all documents from the specified collection.
   * @param {string} collection - the name of the collection to retrieve documents from
   * @return {Promise<any[]>} an array of documents from the specified collection
   */
  public async getDocs(collection: DatabaseCollection): Promise<any[]> {
    const snapshot = await this.firestore.collection(collection).get();
    return snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }

  /**
   * Generate an ID for a document in a Firestore collection.
   * @param {DashboardCollection} collection - The collection to generate the ID for.
   * @return {string} The generated ID for the document.
   */
  public generateId(collection: DatabaseCollection): string {
    return this.firestore.collection(collection).doc().id;
  }

  /**
   * Adds a document to the specified collection in the dashboard database.
   * @param {DashboardCollection} collection - The collection to add the document to.
   * @param {any} document - The document to add to the collection.
   * @return {Promise<string>} A promise that resolves with the ID of the added document.
   */
  public async addDoc(collection: DatabaseCollection, document: any): Promise<string> {
    // Add the document to the specified collection
    return await this.firestore
      .collection(collection)
      .add(document)
      .then(docRef => docRef.id);
  }

  /**
   * Sets a document in the given collection of the dashboard database.
   * @param {DashboardCollection} collection - The collection in which the document will be set.
   * @param {any} document - The document to be set.
   * @param {string} [id] - Optional. The ID of the document.
   * @return {Promise<any>} - A promise that resolves to the updated document.
   */
  public async setDoc(collection: DatabaseCollection, document: any, id?: string): Promise<any> {
    if (id) {
      await this.firestore.collection(collection).doc(id).set(document);
      return { ...document, id };
    }

    const docId = await this.addDoc(collection, document);
    return { ...document, id: docId };
  }

  /**
   * Update a document in the specified collection with the given id and document data.
   * @param collection - The name of the dashboard collection.
   * @param id - The id of the document to update.
   * @param document - The document data to update.
   * @returns - A promise that resolves when the update is complete.
   */
  public async updateDoc(collection: DatabaseCollection, id: string, document: any): Promise<void> {
    Object.keys(document).forEach(key => {
      if (document[key] === undefined) {
        document[key] = null;
      }
    });

    await this.firestore.collection(collection).doc(id).update(document);
  }

  /**
   * Retrieve a list of documents from Firestore collection based on given filters.
   * @param collection - The name of the dashboard collection.
   * @param filters - An array of Firestore query filters.
   * @param limit - The number of documents required (default = 10).
   * @param page - The start offset of documents.
   * @returns A list of documents that meet all the filters, with a size of [limit] and starting from [page].
   * @throws HttpException if there is an error querying the data.
   */
  public async getDocsByQuery(collection: DatabaseCollection, filters?: QueryFilter[], limit = 10, page = 1): Promise<any[]> {
    // Get the collection reference
    const colRef: CollectionReference = this.firestore.collection(collection);

    // Initialize the query with the provided filters
    let query: Query = this.initiateQueries(colRef, filters);

    // TODO: Add sort by

    // Set the offset and limit for pagination
    query = query.offset(limit * (page - 1));
    query = query.limit(limit);

    // Execute the query and get the snapshots
    return await query
      .get()
      .then(snapshots => {
        // Extract the document data from the snapshots and return as an array
        return snapshots.docs.map(doc => {
          const data = doc.data();
          if (!data.id) data.id = doc.id;
          return data;
        });
      })
      .catch(error => {
        throw new HttpException(error?.message ?? 'An error occurred while querying data.', HttpStatus.BAD_REQUEST);
      });
  }

  /**
   * Create queries by applying filters
   *
   * @param {CollectionReference} collection - The collection to query on
   * @param {QueryFilter[]} filters - List of filters to be applied (optional)
   * @returns {Query} - The query object that meets the filters
   */
  private initiateQueries(collection: CollectionReference, filters: QueryFilter[] = []): Query {
    let query: Query = collection;

    // Apply the filters
    if (filters.length) {
      for (const [field, operator, value] of filters) {
        query = query.where(field, operator, value);
      }
    }

    return query;
  }
}
