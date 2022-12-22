import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ContentsCategory } from './ContentsCategory.domain';

export class Contents {
  UUID: string;
  title: string;
  views: number;
  clicks: number;
  isPublished: boolean;
  ownerId: string;
  rewardCategory: string;
  rewardAmount: number;
  startDate: Date;
  endDate: Date;
  budget: number;
  costPerClick: number;
  costPerView: number;
  costPerConversion: number;
  createdAt: Date;
  updatedAt: Date;
  category: ContentsCategory;
  description: string;
  url: string;

  constructor(
    UUID: string,
    title: string,
    views: number,
    clicks: number,
    isPublished: boolean,
    ownerId: string,
    rewardCategory: string,
    rewardAmount: number,
    startDate: Date,
    endDate: Date,
    budget: number,
    costPerClick: number,
    costPerView: number,
    costPerConversion: number,
    createdAt: Date,
    updatedAt: Date,
    category: ContentsCategory,
    description: string,
    url: string,
  ) {
    this.UUID = UUID;
    this.title = title;
    this.views = views;
    this.clicks = clicks;
    this.isPublished = isPublished;
    this.ownerId = ownerId;
    this.rewardCategory = rewardCategory;
    this.rewardAmount = rewardAmount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.budget = budget;
    this.costPerClick = costPerClick;
    this.costPerView = costPerView;
    this.costPerConversion = costPerConversion;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.category = category;
    this.description = description;
    this.url = url;
  }

  getUUID(): string {
    return this.UUID;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getViews(): number {
    return this.views;
  }
  increaseViews(): void {
    this.views++;
  }

  getClicks(): number {
    return this.clicks;
  }

  increaseClicks(): void {
    this.clicks++;
  }

  getIsPublished(): boolean {
    return this.isPublished;
  }

  setIsPublished(isPublished: boolean): void {
    this.isPublished = isPublished;
  }

  getOwnerId(): string {
    return this.ownerId;
  }

  getRewardCategory(): string {
    return this.rewardCategory;
  }

  setRewardCategory(rewardCategory: string): void {
    this.rewardCategory = rewardCategory;
  }

  getRewardAmount(): number {
    return this.rewardAmount;
  }

  setRewardAmount(rewardAmount: number): void {
    this.rewardAmount = rewardAmount;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  setStartDate(startDate: Date): void {
    this.startDate = startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  setEndDate(endDate: Date): void {
    this.endDate = endDate;
  }

  getBudget(): number {
    return this.budget;
  }

  setBudget(budget: number): void {
    this.budget = budget;
  }

  getCostPerClick(): number {
    return this.costPerClick;
  }

  setCostPerClick(costPerClick: number): void {
    this.costPerClick = costPerClick;
  }

  getCostPerView(): number {
    return this.costPerView;
  }

  setCostPerView(costPerView: number): void {
    this.costPerView = costPerView;
  }

  getCostPerConversion(): number {
    return this.costPerConversion;
  }

  setCostPerConversion(costPerConversion: number): void {
    this.costPerConversion = costPerConversion;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  getCategory(): ContentsCategory {
    return this.category;
  }

  setCategory(category: ContentsCategory): void {
    this.category = category;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getUrl(): string {
    return this.url;
  }

  setUrl(url: string): void {
    this.url = url;
  }
}
