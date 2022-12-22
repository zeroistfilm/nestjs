export class ContentsCategory {
  name: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(name: string, description: string, status: string, createdAt: Date, updatedAt: Date) {
    this.name = name;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
