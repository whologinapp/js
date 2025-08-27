// src/api.ts

import { BaseAPIClient } from './core/api-client';
import { profileEndpoints } from './modules/profile';
import { proxyEndpoints } from './modules/proxy';
import { tagEndpoints } from './modules/tag';

export class WhoLoginAPI extends BaseAPIClient {
  public profile: ReturnType<typeof profileEndpoints>;
  public proxy: ReturnType<typeof proxyEndpoints>;
  public tag: ReturnType<typeof tagEndpoints>;

  constructor(apiUrl: string, apiKey: string) {
    super(apiUrl, apiKey);
    this.profile = profileEndpoints(this._request.bind(this));
    this.proxy = proxyEndpoints(this._request.bind(this));
    this.tag = tagEndpoints(this._request.bind(this));
  }
}
