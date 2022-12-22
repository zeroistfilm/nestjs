import { Contents } from '../../../domain/contents.domain';
import { DeleteResult } from "typeorm";

export interface ContentsRepositoryInterface {
  clear(): Promise<void>;
  read(): Promise<void>;
  readByUUID(contentsUUID: string): Promise<Contents>;
  save(contents: Contents): Promise<Contents>;

  delete(contentsUUID: string): Promise<DeleteResult>;
  update(contents: Contents): Promise<Contents>;
}
