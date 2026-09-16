import { describe, it, expect } from 'vitest';
import {
  ACTIVE_DEFECT_ALERTS,
  buildSlackBlockKitPayload,
  buildDiscordEmbedPayload,
} from '../lib/alerts/anomaly-engine';

describe('Crisis Radar & Webhook Engine', () => {
  it('should have active defect alerts with valid severities and positive spike percentages', () => {
    expect(ACTIVE_DEFECT_ALERTS.length).toBeGreaterThanOrEqual(4);

    for (const alert of ACTIVE_DEFECT_ALERTS) {
      expect(['CRITICAL', 'HIGH', 'MEDIUM']).toContain(alert.severity);
      expect(alert.spikePercentage).toBeGreaterThan(0);
      expect(alert.triggerCount).toBeGreaterThan(0);
      expect(alert.channelsAffected.length).toBeGreaterThan(0);
      expect(alert.recommendedAction.length).toBeGreaterThan(10);
    }
  });

  it('should construct valid Slack Block Kit payload structure', () => {
    const alert = ACTIVE_DEFECT_ALERTS[0];
    const payload = buildSlackBlockKitPayload(alert, 'Mühendislik acil incelemede');

    expect(payload).toHaveProperty('blocks');
    expect(Array.isArray(payload.blocks)).toBe(true);
    expect(payload.blocks.length).toBe(4);

    // Header block
    expect(payload.blocks[0].type).toBe('header');
    expect(payload.blocks[0].text.text).toContain(alert.defectName);

    // Section block with fields
    expect(payload.blocks[1].type).toBe('section');
    expect(payload.blocks[1].fields?.length).toBe(4);

    // Actions block with dashboard URL
    expect(payload.blocks[3].type).toBe('actions');
  });

  it('should construct valid Discord Embed payload structure with color coding', () => {
    const criticalAlert = ACTIVE_DEFECT_ALERTS.find((a) => a.severity === 'CRITICAL') || ACTIVE_DEFECT_ALERTS[0];
    const payload = buildDiscordEmbedPayload(criticalAlert);

    expect(payload).toHaveProperty('embeds');
    expect(Array.isArray(payload.embeds)).toBe(true);
    const embed = payload.embeds[0];

    expect(embed.title).toContain(criticalAlert.defectName);
    expect(embed.color).toBe(0xef4444); // Red for critical
    expect(embed.fields.length).toBeGreaterThanOrEqual(5);
  });
});
