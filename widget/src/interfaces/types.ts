export interface ChangelogInterface {
  _id: string
  title: string
  description: string;
  tenantKey: string;
  organisationId: string;
  category: string;
  authorId: string;
  tags: string[];
  published: boolean;
  visibility: string;
  isActive: true;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
