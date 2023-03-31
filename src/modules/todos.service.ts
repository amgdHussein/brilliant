import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';

export class TodoDocument {
  static collectionName = 'todos';

  name: string;
}

@Injectable()
export class RawReadingsService {
  constructor(
    @Inject(TodoDocument.collectionName)
    private todosCollection: CollectionReference<TodoDocument>,
  ) {}
}
