import type { GeolocationData } from '../profile/types';

export interface GeoFromIp {
  ip: string;
  isoCode?: string;
  country?: string;
  city?: string;
  postal?: string;
  languages: string[];
  timeZone: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
}

export type NetworkProxy =
  | { type: 'direct'; geoFromIp?: GeoFromIp | null }
  | { type: 'block' }
  | { type: 'http'; host: string; port: number; username?: string; password?: string; geoFromIp?: GeoFromIp | null }
  | { type: 'socks5'; host: string; port: number; username?: string; password?: string; geoFromIp?: GeoFromIp | null }
  | {
      type: 'wireguard';
      publicKey: string;
      privateKey: string;
      endpoint: string;
      localAddress: string[];
      preSharedKey?: string;
      mtu?: number;
      reserved?: [number, number, number];
      geoFromIp?: GeoFromIp | null;
    };

export interface ProxyCreateRequest {
  name: string;
  data: NetworkProxy;
}

export interface ProxyUpdateRequest {
  name: string;
  data: NetworkProxy;
}

export interface ProxyDetail {
  id: string;
  name: string;
  data: NetworkProxy;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProxyListResponse {
  proxies: ProxyDetail[];
}

export interface ProxyGeolocateRequest {
  type: string;
}

type RequestHandler = <T>(
  endpoint: string,
  method: 'GET' | 'POST',
  body?: unknown
) => Promise<T>;

export interface ProxyAPI {
  /** Get all proxies. */
  getAll(): Promise<ProxyDetail[]>;
  /** Create a new proxy. */
  create(createRequest: ProxyCreateRequest): Promise<ProxyDetail>;
  /** Update a proxy by id. */
  update(proxyId: string, updateRequest: ProxyUpdateRequest): Promise<ProxyDetail>;
  /** Delete a proxy by id. */
  delete(proxyId: string): Promise<{ success: boolean }>;
  /** Geolocate a proxy by id. */
  geolocateById(proxyId: string): Promise<GeolocationData>;
  /** Geolocate a proxy by configuration payload. */
  geolocate(geolocateRequest: ProxyGeolocateRequest): Promise<GeolocationData>;
}

export const proxyEndpoints = (request: RequestHandler): ProxyAPI => ({
  /**
   * Get all proxies.
   */
  getAll: async () => {
    const resp = await request<ProxyListResponse | ProxyDetail[]>('/proxy/all', 'GET');
    return Array.isArray(resp) ? resp : resp?.proxies ?? [];
  },

  /**
   * Create a new proxy.
   */
  create: (createRequest: ProxyCreateRequest) => {
    return request<ProxyDetail>('/proxy/create', 'POST', createRequest);
  },

  /**
   * Update a proxy by id.
   */
  update: (proxyId: string, updateRequest: ProxyUpdateRequest) => {
    return request<ProxyDetail>(`/proxy/${proxyId}/update`, 'POST', updateRequest);
  },

  /**
   * Delete a proxy by id.
   */
  delete: (proxyId: string) => {
    return request<{ success: boolean }>(`/proxy/${proxyId}/delete`, 'GET');
  },

  /**
   * Geolocate a proxy by id.
   */
  geolocateById: (proxyId: string) => {
    return request<GeolocationData>(`/proxy/${proxyId}/geolocate`, 'GET');
  },

  /**
   * Geolocate a proxy by configuration payload.
   */
  geolocate: (geolocateRequest: ProxyGeolocateRequest) => {
    return request<GeolocationData>('/proxy/geolocate', 'POST', geolocateRequest);
  },
});

export type { NetworkProxy as Proxy };
