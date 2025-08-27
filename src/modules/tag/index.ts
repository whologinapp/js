export interface TagData {
  name: string;
}

export interface TagCreateRequest {
  name: string;
}

export interface TagUpdateRequest {
  data: TagData;
}

export interface TagDetail {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TagListResponse {
  tags: TagDetail[];
}

type RequestHandler = <T>(
  endpoint: string,
  method: 'GET' | 'POST',
  body?: unknown
) => Promise<T>;

export interface TagAPI {
  /** Get all tags. */
  getAll(): Promise<TagDetail[]>;
  /** Create a new tag. */
  create(createRequest: TagCreateRequest): Promise<TagDetail>;
  /** Update a tag by id. */
  update(tagId: string, updateRequest: TagUpdateRequest): Promise<TagDetail>;
  /** Delete a tag by id. */
  delete(tagId: string): Promise<{ success: boolean }>;
}

export const tagEndpoints = (request: RequestHandler): TagAPI => ({
  /**
   * Get all tags.
   */
  getAll: async () => {
    const resp = await request<TagListResponse | TagDetail[]>('/tag/all', 'GET');
    return Array.isArray(resp) ? resp : resp?.tags ?? [];
  },

  /**
   * Create a new tag.
   */
  create: (createRequest: TagCreateRequest) => {
    return request<TagDetail>('/tag/create', 'POST', createRequest);
  },

  /**
   * Update a tag by id.
   */
  update: (tagId: string, updateRequest: TagUpdateRequest) => {
    return request<TagDetail>(`/tag/${tagId}/update`, 'POST', updateRequest);
  },

  /**
   * Delete a tag by id.
   */
  delete: (tagId: string) => {
    return request<{ success: boolean }>(`/tag/${tagId}/delete`, 'GET');
  },
});
