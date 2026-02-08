export interface Location {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface CreateLocationData {
  name: string;
  description?: string;
}

export interface UpdateLocationData {
  name?: string;
  description?: string;
}
