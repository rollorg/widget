export interface CategoryInterface {
  _id: string;
  name: string;
  plan: string;
  description: string;
  isDeleted: boolean;
  deletedBy: string | null;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChangelogInterface {
  _id: string
  title: string
  description: string;
  tenantKey: string;
  organisationId: string;
  categories: CategoryInterface[];
  authorId: string;
  tags: string[];
  published: boolean;
  visibility: string;
  isActive: true;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
