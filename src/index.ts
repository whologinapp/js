// Main exports
export { WhoLoginAPI } from './api';
export { WhoLoginAPIError } from './core/error';

// Profile module
export { ProfileBuilder } from './modules/profile/builder';
export { profileEndpoints } from './modules/profile/index';

// Proxy module
export { proxyEndpoints } from './modules/proxy/index';

// Tag module
export { tagEndpoints } from './modules/tag/index';

// Re-export all types
export type {
  // Profile types
  ProfileData,
  ProfileCreateRequest,
  ProfileUpdateRequest,
  ProfileDetail,
  ProfileSearchRequest,
  ProfileOpenRequest,
  ProfileListResponse,
  ProfileTrashResponse,
  CookieData,
  GeolocationData,
  WebRTC,
} from './modules/profile/types';

export {
  SpecterVersion,
  OS,
  UserAgentMode,
  NavigatorMode,
  ScreenMode,
  MediaDevicesMode,
  WebGLMetadataMode,
  WebGLImageMode,
  TimeZoneMode,
  LanguageMode,
  GeolocationMode,
  CanvasMode,
  AudioContextMode,
  WebRTCMode,
  FontMode,
  PermissionState,
  RestoreOnStartupMode,
} from './modules/profile/types';

export type {
  // Proxy types
  Proxy as ProxyType,
  GeoFromIp,
  ProxyCreateRequest,
  ProxyUpdateRequest,
  ProxyDetail,
  ProxyListResponse,
  ProxyGeolocateRequest,
} from './modules/proxy/index';

export type {
  // Tag types
  TagData,
  TagCreateRequest,
  TagUpdateRequest,
  TagDetail,
  TagListResponse,
} from './modules/tag/index';

export type {
  // Internal types
  ApiResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
} from './types/internal';
