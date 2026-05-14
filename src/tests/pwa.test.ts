import { describe, expect, it } from 'vitest';
import manifest from '../../app/manifest';

describe('PWA manifest', () => {
  it('declares installable app metadata and core icon', () => {
    const appManifest = manifest();

    expect(appManifest.name).toBe('DCSPrep');
    expect(appManifest.display).toBe('standalone');
    expect(appManifest.start_url).toBe('/');
    expect(appManifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          src: '/icon.svg',
          purpose: 'maskable'
        })
      ])
    );
  });
});
