import { Logger, NotFoundException } from '@nestjs/common';
import { Model, Types, FilterQuery, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

/**
 * Abstract base class for repository implementations.
 * Provides common methods for CRUD operations on Mongoose documents.
 * Subclasses must implement the `logger` property.
 */
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  /**
   * The logger instance for logging messages.
   * Must be implemented by subclasses.
   */
  protected abstract readonly logger: Logger;
  constructor(
    /**
     * The Mongoose model for the document type.
     */
    protected readonly model: Model<TDocument>,
  ) {}
  /**
   * Creates a new document.
   * @param document The document data to create (excluding the `_id` property).
   * @returns The created document with its generated `_id`.
   */
  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  /**
   * Finds a single document matching the specified filter query.
   * Returns the document as a plain object (without Mongoose methods).
   * Throws a `NotFoundException` if no document is found.
   * @param filterQuery The filter query to use for finding the document.
   * @returns The matching document.
   */
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      // plain object witout mongoose methods
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found wit filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  /**
   * Updates a single document matching the specified filter query.
   * Returns the updated document as a plain object (without Mongoose methods).
   * Throws a `NotFoundException` if no document is found.
   * @param filterQuery The filter query to identify the document to update.
   * @param update The update query to apply to the document.
   * @returns The updated document.
   */
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found wit filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  /**
   * Finds multiple documents matching the specified filter query.
   * Returns the documents as plain objects (without Mongoose methods).
   * @param filterQuery The filter query to use for finding documents.
   * @returns An array of matching documents.
   */
  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery, {}, {}).lean<TDocument[]>(true);
  }

  /**
   * Finds a single document matching the specified filter query and deletes it.
   * Returns the deleted document as a plain object (without Mongoose methods).
   * Throws a `NotFoundException` if no document is found.
   * @param filterQuery The filter query to identify the document to delete.
   * @returns The deleted document.
   */
  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndDelete(filterQuery, {})
      .lean<TDocument>(true);
    if (!document) {
      this.logger.warn('Document not found wit filterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }
}
