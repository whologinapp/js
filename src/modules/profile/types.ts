export type SpecterVersion = string;

export type Browser = {
  type: 'specter';
  version?: SpecterVersion;
};

export type OS = 
  | { type: 'windows' }
  | { type: 'linux' }
  | { type: 'android' };

export const OS = {
  Windows: { type: 'windows' } as const,
  Linux: { type: 'linux' } as const,
  Android: { type: 'android' } as const
} as const;

export enum UserAgentMode {
  System = 'system',
  Mask = 'mask',
  Custom = 'custom'
}

export interface UserAgentMetadata {
  architecture: string;
  mobile: boolean;
  model: string;
  platform: string;
  platformVersion: string;
  bitness: string;
  wow64: boolean;
}

export interface UserAgentCustom {
  value: string;
  metadata: UserAgentMetadata;
}

export interface UserAgent {
  mode: UserAgentMode;
  custom?: UserAgentCustom;
}

export enum NavigatorMode {
  System = 'system',
  Mask = 'mask',
  Custom = 'custom'
}

export interface NavigatorCustom {
  platform: string;
  hardwareConcurrency: number;
  deviceMemory: number;
  maxTouchPoints: number;
}

export interface Navigator {
  mode: NavigatorMode;
  seed?: string;
  custom?: NavigatorCustom;
}

export enum ScreenMode {
  System = 'system',
  Mask = 'mask',
  Custom = 'custom'
}

export interface ScreenCustom {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  devicePixelRatio: number;
}

export interface Screen {
  mode: ScreenMode;
  seed?: string;
  custom?: ScreenCustom;
}

export enum MediaDevicesMode {
  System = 'system',
  Mask = 'mask'
}

export interface MediaDevices {
  mode: MediaDevicesMode;
  seed?: string;
}

export enum WebGLMetadataMode {
  System = 'system',
  Mask = 'mask',
  Custom = 'custom'
}

export interface WebGLMetadataCustom {
  vendor: string;
  renderer: string;
}

export interface WebGLMetadata {
  mode: WebGLMetadataMode;
  seed?: string;
  custom?: WebGLMetadataCustom;
}

export enum WebGLImageMode {
  System = 'system',
  Mask = 'mask'
}

export interface WebGLImage {
  mode: WebGLImageMode;
  seed?: string;
}

export enum TimeZoneMode {
  System = 'system',
  BasedIP = 'based-ip',
  Custom = 'custom'
}

export interface TimeZone {
  mode: TimeZoneMode;
  value?: string; // IANA timezone string
}

export enum LanguageMode {
  System = 'system',
  BasedIP = 'based-ip',
  Custom = 'custom'
}

export interface Language {
  mode: LanguageMode;
  value?: string[];
}

export enum GeolocationMode {
  BasedIP = 'based-ip',
  Custom = 'custom'
}

export interface GeolocationCustom {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface Geolocation {
  mode: GeolocationMode;
  custom?: GeolocationCustom;
}

export enum CanvasMode {
  System = 'system',
  Mask = 'mask'
}

export interface Canvas {
  mode: CanvasMode;
  seed?: string;
}

export enum AudioContextMode {
  System = 'system',
  Mask = 'mask'
}

export interface AudioContext {
  mode: AudioContextMode;
  seed?: string;
}

export enum ClientRectsMode {
  System = 'system',
  Mask = 'mask'
}

export interface ClientRects {
  mode: ClientRectsMode;
  seed?: string;
}

export enum FontMode {
  System = 'system',
  Mask = 'mask'
}

export interface Font {
  mode: FontMode;
  seed?: string;
}

export interface Extension {
  id: string;
  name: string;
  path: string;
}

export interface ExtensionManager {
  list?: Extension[];
  installPaths?: string[];
  uninstallIds?: string[];
  disabledIds?: string[];
  pinnedIds?: string[];
}

export enum PermissionState {
  Allow = 'allow',
  Prompt = 'prompt',
  Block = 'block'
}

export interface Permissions {
  geolocation?: PermissionState;
  notifications?: PermissionState;
}

export interface Dns {
  address: string;
}

export enum RestoreOnStartupMode {
  Default = 'default',
  Last = 'last',
  Urls = 'urls'
}

export interface RestoreOnStartup {
  mode: RestoreOnStartupMode;
  urls?: string[];
}

import type { Proxy as ProxyType } from '../proxy';
export interface ProfileData {
  pinned?: boolean;
  profileName?: string;
  profileIcon?: string;
  os?: OS;
  browser?: Browser;
  proxy?: ProxyType;
  doNotTrack?: boolean;
  userAgent?: UserAgent;
  navigator?: Navigator;
  screen?: Screen;
  mediaDevices?: MediaDevices;
  webGLMetadata?: WebGLMetadata;
  timeZone?: TimeZone;
  language?: Language;
  geolocation?: Geolocation;
  canvas?: Canvas;
  audioContext?: AudioContext;
  clientRects?: ClientRects;
  font?: Font;
  webGLImage?: WebGLImage;
  extensionManager?: ExtensionManager;
  permissions?: Permissions;
  note?: string;
  restoreOnStartup?: RestoreOnStartup;
  dns?: Dns;
  commandLineSwitches?: string[];
}

export interface ProfileCreateRequest {
  id?: string;
  data: Partial<ProfileData>;
  tags?: string[];
}

export interface ProfileUpdateRequest {
  data: Partial<ProfileData>;
  tags?: string[];
}

export interface ProfileDetail {
  id: string;
  data: ProfileData;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  lastRunAt?: string | null;
}

export interface ProfileSearchRequest {
  tags?: string[];
}

export interface ProfileOpenRequest {
  debuggingPort?: number;
  headless?: boolean;
  commandLineSwitches?: string[];
}

export interface CookieData {
  domain: string;
  expirationDate: number;
  hostOnly: boolean;
  httpOnly: boolean;
  name: string;
  path: string;
  sameSite: string;
  secure: boolean;
  session: boolean;
  storeId: string;
  value: string;
}

export interface GeolocationData {
  ip: string;
  isoCode: string;
  country: string;
  city: string;
  languages: string[];
  timeZone: string;
}

export interface ProfileListResponse {
  profiles: ProfileDetail[];
}

export interface ProfileTrashResponse {
  profiles: ProfileDetail[];
}
