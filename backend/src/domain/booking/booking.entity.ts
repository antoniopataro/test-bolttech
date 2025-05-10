import type { BookingAttributes } from "./booking.types";

export class BookingEntity {
  private readonly _id: string;
  private readonly _offerId: string;
  private readonly _searchId: string;
  private readonly _userId: string;
  private readonly _endDate: string;
  private readonly _startDate: string;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  constructor(attributes: BookingAttributes) {
    this._id = attributes.id;
    this._offerId = attributes.offerId;
    this._searchId = attributes.searchId;
    this._userId = attributes.userId;
    this._endDate = attributes.endDate;
    this._startDate = attributes.startDate;
    this._createdAt = attributes.createdAt;
    this._updatedAt = attributes.updatedAt;
  }

  public get id(): string {
    return this._id;
  }

  public get offerId(): string {
    return this._offerId;
  }

  public get searchId(): string {
    return this._searchId;
  }

  public get userId(): string {
    return this._userId;
  }

  public get endDate(): string {
    return this._endDate;
  }

  public get startDate(): string {
    return this._startDate;
  }

  public get createdAt(): string {
    return this._createdAt;
  }

  public get updatedAt(): string {
    return this._updatedAt;
  }
}
