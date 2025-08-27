import {
  type ProfileData,
  OS,
  type Browser,
  SpecterVersion,
  type UserAgent,
  UserAgentMode,
  type UserAgentCustom,
  type Navigator,
  NavigatorMode,
  type NavigatorCustom,
  type Screen,
  ScreenMode,
  type ScreenCustom,
  type MediaDevices,
  MediaDevicesMode,
  type WebGLMetadata,
  WebGLMetadataMode,
  type WebGLMetadataCustom,
  type WebGLImage,
  WebGLImageMode,
  type TimeZone,
  TimeZoneMode,
  type Language,
  LanguageMode,
  type Geolocation,
  GeolocationMode,
  type GeolocationCustom,
  type Canvas,
  CanvasMode,
  type AudioContext,
  AudioContextMode,
  type ClientRects,
  ClientRectsMode,
  type Font,
  FontMode,
  type ExtensionManager,
  type Extension,
  type Permissions,
  PermissionState,
  type Dns,
  type RestoreOnStartup,
  RestoreOnStartupMode,
} from './types';
import type { Proxy as ProxyType, GeoFromIp } from '../proxy';

/**
 * Fluent builder for constructing profile payloads.
 */
export class ProfileBuilder {
  private profile: Partial<ProfileData> = {};
  private tags: string[] = [];
  private id?: string;

  constructor() {
    this.profile = {};
  }

  /** Assign an existing profile id (optional). */
  withId(id: string): this {
    this.id = id;
    return this;
  }

  /** Set profile display name. */
  withProfileName(profileName: string): this {
    this.profile.profileName = profileName;
    return this;
  }

  /** Set profile icon key. */
  withProfileIcon(profileIcon: string): this {
    this.profile.profileIcon = profileIcon;
    return this;
  }

  /** Set note. */
  withNote(note: string): this {
    this.profile.note = note;
    return this;
  }

  /** Pin or unpin profile. */
  withPinned(pinned: boolean): this {
    this.profile.pinned = pinned;
    return this;
  }

  /** Replace all tags. */
  withTags(tags: string[]): this {
    this.tags = tags;
    return this;
  }

  /** Append a single tag. */
  withTag(tag: string): this {
    this.tags.push(tag);
    return this;
  }

  /** Set operating system. */
  withOS(os: OS): this {
    this.profile.os = os;
    return this;
  }

  /** Set browser configuration. */
  withBrowser(browser: Browser): this {
    this.profile.browser = browser;
    return this;
  }

  /** Helper to set Specter browser with version. */
  withSpecterBrowser(version: SpecterVersion): this {
    this.profile.browser = {
      type: 'specter',
      version,
    };
    return this;
  }

  /** Set proxy configuration. */
  withProxy(proxy: ProxyType): this {
    this.profile.proxy = proxy;
    return this;
  }

  withDirectProxy(geoFromIp?: GeoFromIp | null): this {
    return this.withProxy({ type: 'direct', geoFromIp });
  }

  withBlockProxy(): this {
    return this.withProxy({ type: 'block' });
  }

  withHttpProxy(params: {
    host: string;
    port: number;
    username?: string;
    password?: string;
    geoFromIp?: GeoFromIp | null;
  }): this {
    return this.withProxy({ type: 'http', ...params });
  }

  withSocks5Proxy(params: {
    host: string;
    port: number;
    username?: string;
    password?: string;
    geoFromIp?: GeoFromIp | null;
  }): this {
    return this.withProxy({ type: 'socks5', ...params });
  }

  withWireGuardProxy(params: {
    publicKey: string;
    privateKey: string;
    endpoint: string;
    localAddress: string[];
    preSharedKey?: string;
    mtu?: number;
    reserved?: [number, number, number];
    geoFromIp?: GeoFromIp | null;
  }): this {
    return this.withProxy({ type: 'wireguard', ...params });
  }

  /** Enable Do Not Track. */
  withDoNotTrackEnabled(): this {
    this.profile.doNotTrack = true;
    return this;
  }

  /** Disable Do Not Track. */
  withDoNotTrackDisabled(): this {
    this.profile.doNotTrack = false;
    return this;
  }

  /** Set user agent configuration. */
  withUserAgent(userAgent: UserAgent): this {
    this.profile.userAgent = userAgent;
    return this;
  }

  /** Set user agent mode. */
  withUserAgentMode(mode: UserAgentMode, seed?: string): this {
    this.profile.userAgent = { mode };
    return this;
  }

  /** Provide custom user agent values. */
  withUserAgentCustom(custom: UserAgentCustom): this {
    if (!this.profile.userAgent) {
      this.profile.userAgent = { mode: UserAgentMode.Custom };
    }
    this.profile.userAgent.custom = custom;
    return this;
  }

  /** Set navigator configuration. */
  withNavigator(navigator: Navigator): this {
    this.profile.navigator = navigator;
    return this;
  }

  /** Set navigator mode. */
  withNavigatorMode(mode: NavigatorMode, seed?: string): this {
    this.profile.navigator = { mode, seed };
    return this;
  }

  /** Provide custom navigator values. */
  withNavigatorCustom(custom: NavigatorCustom): this {
    if (!this.profile.navigator) {
      this.profile.navigator = { mode: NavigatorMode.Custom };
    }
    this.profile.navigator.custom = custom;
    return this;
  }

  /** Set screen configuration. */
  withScreen(screen: Screen): this {
    this.profile.screen = screen;
    return this;
  }

  /** Set screen mode. */
  withScreenMode(mode: ScreenMode, seed?: string): this {
    this.profile.screen = { mode, seed };
    return this;
  }

  /** Provide custom screen values. */
  withScreenCustom(custom: ScreenCustom): this {
    if (!this.profile.screen) {
      this.profile.screen = { mode: ScreenMode.Custom };
    }
    this.profile.screen.custom = custom;
    return this;
  }

  /** Set media devices configuration. */
  withMediaDevices(mediaDevices: MediaDevices): this {
    this.profile.mediaDevices = mediaDevices;
    return this;
  }

  /** Set media devices mode. */
  withMediaDevicesMode(mode: MediaDevicesMode, seed?: string): this {
    this.profile.mediaDevices = { mode, seed };
    return this;
  }

  /** Set WebGL metadata configuration. */
  withWebGLMetadata(webGLMetadata: WebGLMetadata): this {
    this.profile.webGLMetadata = webGLMetadata;
    return this;
  }

  /** Set WebGL metadata mode. */
  withWebGLMetadataMode(mode: WebGLMetadataMode, seed?: string): this {
    this.profile.webGLMetadata = { mode, seed };
    return this;
  }

  /** Provide custom WebGL metadata values. */
  withWebGLMetadataCustom(custom: WebGLMetadataCustom): this {
    if (!this.profile.webGLMetadata) {
      this.profile.webGLMetadata = { mode: WebGLMetadataMode.Custom };
    }
    this.profile.webGLMetadata.custom = custom;
    return this;
  }

  withWebGLImage(webGLImage: WebGLImage): this {
    this.profile.webGLImage = webGLImage;
    return this;
  }

  withWebGLImageMode(mode: WebGLImageMode, seed?: string): this {
    this.profile.webGLImage = { mode, seed };
    return this;
  }

  /** Set time zone configuration. */
  withTimeZone(timeZone: TimeZone): this {
    this.profile.timeZone = timeZone;
    return this;
  }

  /** Set time zone mode. */
  withTimeZoneMode(mode: TimeZoneMode, value?: string): this {
    this.profile.timeZone = { mode, value };
    return this;
  }

  /** Set language configuration. */
  withLanguage(language: Language): this {
    this.profile.language = language;
    return this;
  }

  /** Set language mode. */
  withLanguageMode(mode: LanguageMode, value?: string[]): this {
    this.profile.language = { mode, value };
    return this;
  }

  /** Set geolocation configuration. */
  withGeolocation(geolocation: Geolocation): this {
    this.profile.geolocation = geolocation;
    return this;
  }

  /** Set geolocation mode. */
  withGeolocationMode(mode: GeolocationMode): this {
    this.profile.geolocation = { mode };
    return this;
  }

  /** Provide custom geolocation values. */
  withGeolocationCustom(custom: GeolocationCustom): this {
    if (!this.profile.geolocation) {
      this.profile.geolocation = { mode: GeolocationMode.Custom };
    }
    this.profile.geolocation.custom = custom;
    return this;
  }

  /** Set canvas configuration. */
  withCanvas(canvas: Canvas): this {
    this.profile.canvas = canvas;
    return this;
  }

  /** Set canvas mode. */
  withCanvasMode(mode: CanvasMode, seed?: string): this {
    this.profile.canvas = { mode, seed };
    return this;
  }

  /** Set audio context configuration. */
  withAudioContext(audioContext: AudioContext): this {
    this.profile.audioContext = audioContext;
    return this;
  }

  /** Set audio context mode. */
  withAudioContextMode(mode: AudioContextMode, seed?: string): this {
    this.profile.audioContext = { mode, seed };
    return this;
  }

  /** Set client rects configuration. */
  withClientRects(clientRects: ClientRects): this {
    this.profile.clientRects = clientRects;
    return this;
  }

  /** Set client rects mode. */
  withClientRectsMode(mode: ClientRectsMode, seed?: string): this {
    this.profile.clientRects = { mode, seed };
    return this;
  }

  /** Set font configuration. */
  withFont(font: Font): this {
    this.profile.font = font;
    return this;
  }

  /** Set font mode. */
  withFontMode(mode: FontMode, seed?: string): this {
    this.profile.font = { mode, seed };
    return this;
  }

  /** Set extension manager configuration. */
  withExtensionManager(extensionManager: ExtensionManager): this {
    this.profile.extensionManager = extensionManager;
    return this;
  }

  /** Replace full extension list. */
  withExtensions(extensions: Extension[]): this {
    if (!this.profile.extensionManager) {
      this.profile.extensionManager = {};
    }
    this.profile.extensionManager.list = extensions;
    return this;
  }

  /** Set permissions configuration. */
  withPermissions(permissions: Permissions): this {
    this.profile.permissions = permissions;
    return this;
  }

  /** Set geolocation permission state. */
  withGeolocationPermission(state: PermissionState): this {
    if (!this.profile.permissions) {
      this.profile.permissions = {};
    }
    this.profile.permissions.geolocation = state;
    return this;
  }

  /** Set notifications permission state. */
  withNotificationPermission(state: PermissionState): this {
    if (!this.profile.permissions) {
      this.profile.permissions = {};
    }
    this.profile.permissions.notifications = state;
    return this;
  }

  /** Set DNS configuration. */
  withDns(dns: Dns): this {
    this.profile.dns = dns;
    return this;
  }

  /** Convenience: set DNS address. */
  withDnsAddress(address: string): this {
    this.profile.dns = { address };
    return this;
  }

  /** Set startup restore configuration. */
  withRestoreOnStartup(restoreOnStartup: RestoreOnStartup): this {
    this.profile.restoreOnStartup = restoreOnStartup;
    return this;
  }

  /** Set startup restore mode and URLs. */
  withRestoreOnStartupMode(mode: RestoreOnStartupMode, urls?: string[]): this {
    this.profile.restoreOnStartup = { mode, urls };
    return this;
  }

  /** Replace Chromium command line switches. */
  withCommandLineSwitches(switches: string[]): this {
    this.profile.commandLineSwitches = switches;
    return this;
  }

  withWindowsOS(): this {
    return this.withOS(OS.Windows);
  }

  withLinuxOS(): this {
    return this.withOS(OS.Linux);
  }

  withAndroidOS(): this {
    return this.withOS(OS.Android);
  }

  withSystemUserAgent(): this {
    return this.withUserAgentMode(UserAgentMode.System);
  }

  withMaskUserAgent(seed?: string): this {
    return this.withUserAgentMode(UserAgentMode.Mask, seed);
  }

  withSystemNavigator(): this {
    return this.withNavigatorMode(NavigatorMode.System);
  }

  withMaskNavigator(seed?: string): this {
    return this.withNavigatorMode(NavigatorMode.Mask, seed);
  }

  withSystemScreen(): this {
    return this.withScreenMode(ScreenMode.System);
  }

  withMaskScreen(seed?: string): this {
    return this.withScreenMode(ScreenMode.Mask, seed);
  }

  withSystemTimeZone(): this {
    return this.withTimeZoneMode(TimeZoneMode.System);
  }

  withBasedIPTimeZone(): this {
    return this.withTimeZoneMode(TimeZoneMode.BasedIP);
  }

  withCustomTimeZone(timezone: string): this {
    return this.withTimeZoneMode(TimeZoneMode.Custom, timezone);
  }

  withSystemLanguage(): this {
    return this.withLanguageMode(LanguageMode.System);
  }

  withBasedIPLanguage(): this {
    return this.withLanguageMode(LanguageMode.BasedIP);
  }

  withCustomLanguage(languages: string[]): this {
    return this.withLanguageMode(LanguageMode.Custom, languages);
  }

  withBasedIPGeolocation(): this {
    return this.withGeolocationMode(GeolocationMode.BasedIP);
  }

  withCustomGeolocation(
    latitude: number,
    longitude: number,
    accuracy: number
  ): this {
    return this.withGeolocationCustom({ latitude, longitude, accuracy });
  }

  withMaskCanvas(seed?: string): this {
    return this.withCanvasMode(CanvasMode.Mask, seed);
  }

  withMaskAudioContext(seed?: string): this {
    return this.withAudioContextMode(AudioContextMode.Mask, seed);
  }

  withMaskClientRects(seed?: string): this {
    return this.withClientRectsMode(ClientRectsMode.Mask, seed);
  }

  withMaskFont(seed?: string): this {
    return this.withFontMode(FontMode.Mask, seed);
  }

  withMaskWebGLImage(seed?: string): this {
    return this.withWebGLImageMode(WebGLImageMode.Mask, seed);
  }

  withMaskWebGLMetadata(seed?: string): this {
    return this.withWebGLMetadataMode(WebGLMetadataMode.Mask, seed);
  }

  withSystemMediaDevices(): this {
    return this.withMediaDevicesMode(MediaDevicesMode.System);
  }

  /** Build the final request payload to send to the API. */
  _buildPayload() {
    return {
      id: this.id,
      tags: this.tags,
      data: this.profile as Partial<ProfileData>,
    };
  }

  /** Build the update request payload (without id). */
  _buildUpdatePayload() {
    return {
      data: this.profile as Partial<ProfileData>,
      tags: this.tags.length ? this.tags : undefined,
    };
  }
}
