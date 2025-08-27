import type {
  ProfileCreateRequest,
  ProfileUpdateRequest,
  ProfileDetail,
  ProfileSearchRequest,
  ProfileOpenRequest,
  ProfileListResponse,
  ProfileTrashResponse,
  CookieData,
  GeolocationData,
} from './types';
import type { Extension } from './types';
import { ProfileBuilder } from './builder';

type RequestHandler = <T>(
  endpoint: string,
  method: 'GET' | 'POST',
  body?: unknown
) => Promise<T>;

export interface ProfileAPI {
  /** Create a profile from a request or a ProfileBuilder instance. */
  create(
    requestOrBuilder: ProfileCreateRequest | ProfileBuilder
  ): Promise<ProfileDetail>;
  /** Get all profiles. */
  getAll(): Promise<ProfileDetail[]>;
  /** Search profiles by filters. */
  search(searchRequest: ProfileSearchRequest): Promise<ProfileDetail[]>;
  /** Get list of currently open profiles. */
  getListOpen(): Promise<ProfileDetail[]>;
  /** Get a profile by id. */
  getById(profileId: string): Promise<ProfileDetail>;
  /** Get profile extensions for a given profile id. */
  getExtensions(profileId: string): Promise<Extension[]>;
  /** Update a profile by id. Accepts a raw request or a ProfileBuilder. */
  update(
    profileId: string,
    updateRequest: ProfileUpdateRequest | ProfileBuilder
  ): Promise<ProfileDetail>;
  /** Delete a profile by id. */
  delete(profileId: string): Promise<{ success: boolean }>;
  /** Open a profile; returns WebSocket URL string or null. */
  open(
    profileId: string,
    openRequest?: ProfileOpenRequest
  ): Promise<string | null>;
  /** Close a profile by id. */
  close(profileId: string): Promise<{ success: boolean }>;
  /** Add tags to a profile. */
  addTags(profileId: string, tags: string[]): Promise<ProfileDetail>;
  /** Remove tags from a profile. */
  removeTags(profileId: string, tags: string[]): Promise<ProfileDetail>;
  /** Export cookies of a profile. */
  exportCookies(profileId: string): Promise<CookieData[]>;
  /** Import cookies into a profile. */
  importCookies(
    profileId: string,
    cookies: CookieData[]
  ): Promise<{ success: boolean }>;
  /** Get geolocation data of a profile. */
  geolocate(profileId: string): Promise<GeolocationData>;
  /** Get trashed profiles. */
  getTrash(): Promise<ProfileDetail[]>;
  /** Permanently delete a profile from trash by id. */
  deleteFromTrash(profileId: string): Promise<{ success: boolean }>;
  /** Clean all profiles from trash. */
  cleanTrash(): Promise<{ success: boolean }>;
  /** Restore all profiles from trash. */
  restoreAllFromTrash(): Promise<{ success: boolean }>;
  /** Restore a profile from trash by id. */
  restoreFromTrash(profileId: string): Promise<{ success: boolean }>;
  /** Install extensions by file paths for a profile. */
  installExtensions(
    profileId: string,
    installPaths: string[]
  ): Promise<ProfileDetail>;
  /** Disable extensions for a profile by extension IDs. */
  disableExtensions(
    profileId: string,
    extensionIds: string[]
  ): Promise<ProfileDetail>;
  /** Pin extensions for a profile by extension IDs. */
  pinExtensions(
    profileId: string,
    extensionIds: string[]
  ): Promise<ProfileDetail>;
  /** Uninstall extensions for a profile by extension IDs. */
  uninstallExtensions(
    profileId: string,
    extensionIds: string[]
  ): Promise<ProfileDetail>;
}

export const profileEndpoints = (request: RequestHandler): ProfileAPI => ({
  /**
   * Create a profile from a request or a ProfileBuilder instance.
   */
  create: (requestOrBuilder: ProfileCreateRequest | ProfileBuilder) => {
    let payload: ProfileCreateRequest;
    if (requestOrBuilder instanceof ProfileBuilder) {
      payload = requestOrBuilder._buildPayload();
    } else {
      payload = requestOrBuilder;
    }
    return request<ProfileDetail>('/profile/create', 'POST', payload);
  },

  /**
   * Get all profiles.
   */
  getAll: async () => {
    const resp = await request<ProfileListResponse | ProfileDetail[]>(
      '/profile/all',
      'GET'
    );
    return Array.isArray(resp) ? resp : resp?.profiles ?? [];
  },

  /**
   * Search profiles by filters.
   */
  search: async (searchRequest: ProfileSearchRequest) => {
    const resp = await request<ProfileListResponse | ProfileDetail[]>(
      '/profile/search',
      'POST',
      searchRequest
    );
    return Array.isArray(resp) ? resp : resp?.profiles ?? [];
  },

  /**
   * Get list of currently open profiles.
   */
  getListOpen: async () => {
    const resp = await request<ProfileListResponse | ProfileDetail[]>(
      '/profile/list-open',
      'GET'
    );
    return Array.isArray(resp) ? resp : resp?.profiles ?? [];
  },

  /**
   * Get a profile by id.
   */
  getById: (profileId: string) => {
    return request<ProfileDetail>(`/profile/${profileId}`, 'GET');
  },

  /**
   * Get profile extensions for a given profile id.
   */
  getExtensions: async (profileId: string) => {
    const detail = await request<ProfileDetail>(`/profile/${profileId}`, 'GET');
    return (detail.data?.extensionManager?.list ?? []) as Extension[];
  },

  /**
   * Update a profile by id.
   */
  update: (
    profileId: string,
    updateRequest: ProfileUpdateRequest | ProfileBuilder
  ) => {
    const payload =
      updateRequest instanceof ProfileBuilder
        ? updateRequest._buildUpdatePayload()
        : updateRequest;
    return request<ProfileDetail>(
      `/profile/${profileId}/update`,
      'POST',
      payload
    );
  },

  /**
   * Delete a profile by id.
   */
  delete: (profileId: string) => {
    return request<{ success: boolean }>(`/profile/${profileId}/delete`, 'GET');
  },

  /**
   * Open a profile and return WebSocket URL string when available.
   * Returns undefined when backend responds with data=null (no debugging port).
   */
  open: (profileId: string, openRequest?: ProfileOpenRequest) => {
    // Some backends require a JSON body for POST; send {} when undefined
    return request<string | null>(
      `/profile/${profileId}/open`,
      'POST',
      openRequest ?? {}
    );
  },

  /**
   * Close a profile by id.
   */
  close: (profileId: string) => {
    return request<{ success: boolean }>(`/profile/${profileId}/close`, 'GET');
  },

  /**
   * Add tags to a profile.
   */
  addTags: (profileId: string, tags: string[]) => {
    return request<ProfileDetail>(
      `/profile/${profileId}/add-tags`,
      'POST',
      tags
    );
  },

  /**
   * Remove tags from a profile.
   */
  removeTags: (profileId: string, tags: string[]) => {
    return request<ProfileDetail>(
      `/profile/${profileId}/remove-tags`,
      'POST',
      tags
    );
  },

  /**
   * Export cookies of a profile.
   */
  exportCookies: (profileId: string) => {
    return request<CookieData[]>(`/profile/${profileId}/export-cookies`, 'GET');
  },

  /**
   * Import cookies into a profile.
   */
  importCookies: (profileId: string, cookies: CookieData[]) => {
    return request<{ success: boolean }>(
      `/profile/${profileId}/import-cookies`,
      'POST',
      cookies
    );
  },

  /**
   * Get geolocation data of a profile.
   */
  geolocate: (profileId: string) => {
    return request<GeolocationData>(`/profile/${profileId}/geolocate`, 'GET');
  },

  /**
   * Get trashed profiles.
   */
  getTrash: async () => {
    const resp = await request<ProfileTrashResponse | ProfileDetail[]>(
      '/profile/trash',
      'GET'
    );
    return Array.isArray(resp) ? resp : resp?.profiles ?? [];
  },

  /**
   * Permanently delete a profile from trash by id.
   */
  deleteFromTrash: (profileId: string) => {
    return request<{ success: boolean }>(
      `/profile/trash/${profileId}/delete`,
      'GET'
    );
  },

  /**
   * Clean all profiles from trash.
   */
  cleanTrash: () => {
    return request<{ success: boolean }>('/profile/trash/clean', 'GET');
  },

  /**
   * Restore all profiles from trash.
   */
  restoreAllFromTrash: () => {
    return request<{ success: boolean }>('/profile/trash/restore-all', 'GET');
  },

  /**
   * Restore a profile from trash by id.
   */
  restoreFromTrash: (profileId: string) => {
    return request<{ success: boolean }>(
      `/profile/trash/${profileId}/restore`,
      'GET'
    );
  },

  // ---------------- Extension helpers ----------------
  /**
   * Install extensions by file paths for a profile.
   */
  installExtensions: (profileId: string, installPaths: string[]) => {
    return request<ProfileDetail>(`/profile/${profileId}/update`, 'POST', {
      data: { extensionManager: { installPaths } },
    });
  },

  /**
   * Disable extensions for a profile by extension IDs.
   */
  disableExtensions: (profileId: string, extensionIds: string[]) => {
    return request<ProfileDetail>(`/profile/${profileId}/update`, 'POST', {
      data: { extensionManager: { disabledIds: extensionIds } },
    });
  },

  /**
   * Pin extensions for a profile by extension IDs.
   */
  pinExtensions: (profileId: string, extensionIds: string[]) => {
    return request<ProfileDetail>(`/profile/${profileId}/update`, 'POST', {
      data: { extensionManager: { pinnedIds: extensionIds } },
    });
  },

  /**
   * Uninstall extensions for a profile by extension IDs.
   */
  uninstallExtensions: (profileId: string, extensionIds: string[]) => {
    return request<ProfileDetail>(`/profile/${profileId}/update`, 'POST', {
      data: { extensionManager: { uninstallIds: extensionIds } },
    });
  },
});

export { ProfileBuilder };
