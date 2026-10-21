import { Request, Response } from 'express';
import crypto from 'crypto';

// Cache processed event/message IDs to prevent duplicate handling (max 1000 entries)
const processedEvents = new Set<string>();
const MAX_CACHE_SIZE = 1000;

const trackEventId = (id: string): boolean => {
  if (processedEvents.has(id)) {
    return true; // Already processed
  }
  if (processedEvents.size >= MAX_CACHE_SIZE) {
    const firstKey = processedEvents.values().next().value;
    if (firstKey) processedEvents.delete(firstKey);
  }
  processedEvents.add(id);
  return false;
};

/**
 * Meta Webhook Verification Handler (GET /api/webhook)
 * Validates hub.mode, hub.verify_token, and responds with hub.challenge
 */
export const verifyWebhook = (req: Request, res: Response) => {
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (!expectedToken) {
      console.warn('[WhatsApp Webhook] WHATSAPP_VERIFY_TOKEN is not configured on server.');
      return res.status(500).send('Server verify token configuration missing');
    }

    // Mode must be 'subscribe' and token must match exactly
    if (mode === 'subscribe' && token === expectedToken) {
      console.log('[WhatsApp Webhook] Webhook verification handshake successful from Meta.');
      return res.status(200).send(challenge);
    } else {
      console.warn('[WhatsApp Webhook] Verification failed: Token mismatch or invalid mode.', {
        receivedMode: mode,
        tokenMatches: token === expectedToken
      });
      return res.status(403).send('Forbidden: Verification token mismatch');
    }
  } catch (err: any) {
    console.error('[WhatsApp Webhook] Verification error:', err?.message || err);
    return res.status(500).send('Internal Server Error during verification');
  }
};

/**
 * Validates Meta X-Hub-Signature-256 using timing-safe comparison
 */
const isValidSignature = (req: Request): boolean => {
  const appSecret = process.env.META_APP_SECRET;
  
  // If META_APP_SECRET is not configured, log notice and permit in development
  if (!appSecret) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('[WhatsApp Webhook] META_APP_SECRET is not set in production. Signature validation skipped.');
    }
    return true;
  }

  const signatureHeader = req.headers['x-hub-signature-256'] as string | undefined;
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) {
    console.warn('[WhatsApp Webhook] Missing or malformed X-Hub-Signature-256 header.');
    return false;
  }

  const rawBody = (req as any).rawBody || Buffer.from(JSON.stringify(req.body || {}));
  const expectedHash = crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex');
  const expectedHeader = `sha256=${expectedHash}`;

  try {
    const headerBuffer = Buffer.from(signatureHeader, 'utf8');
    const expectedBuffer = Buffer.from(expectedHeader, 'utf8');

    if (headerBuffer.length !== expectedBuffer.length) {
      return false;
    }
    return crypto.timingSafeEqual(headerBuffer, expectedBuffer);
  } catch {
    return false;
  }
};

/**
 * Meta Webhook Events Receiver (POST /api/webhook)
 * Receives delivery updates and inbound events from WhatsApp Cloud API
 */
export const handleWebhookEvent = (req: Request, res: Response) => {
  try {
    // 1. Verify Meta HMAC-SHA256 Signature
    if (!isValidSignature(req)) {
      console.warn('[WhatsApp Webhook] Event rejected: Invalid HMAC signature.');
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }

    const body = req.body;

    // Check if this is a WhatsApp Business Account webhook payload
    if (body.object === 'whatsapp_business_account') {
      if (Array.isArray(body.entry)) {
        for (const entry of body.entry) {
          const changes = entry.changes || [];
          for (const change of changes) {
            const value = change.value;
            if (!value) continue;

            // Handle Message Status Updates (sent, delivered, read, failed)
            if (Array.isArray(value.statuses)) {
              for (const status of value.statuses) {
                const statusKey = `status_${status.id}_${status.status}`;
                if (trackEventId(statusKey)) continue; // skip duplicate event

                console.log(`[WhatsApp Webhook] Message ID ${status.id} status update: '${status.status}' (Recipient: ${status.recipient_id})`);
                
                if (status.errors && status.errors.length > 0) {
                  console.error(`[WhatsApp Webhook] Message ${status.id} delivery error details:`, status.errors[0]?.message || status.errors[0]?.title);
                }
              }
            }

            // Handle Incoming Inbound Messages (if user replies)
            if (Array.isArray(value.messages)) {
              for (const message of value.messages) {
                const messageKey = `msg_${message.id}`;
                if (trackEventId(messageKey)) continue; // skip duplicate event

                console.log(`[WhatsApp Webhook] Received inbound ${message.type} from sender ID ${message.from}`);
              }
            }
          }
        }
      }

      // Return HTTP 200 OK fast to acknowledge Meta
      return res.status(200).send('EVENT_RECEIVED');
    }

    // Unrecognized object type, still acknowledge with 200 to avoid retry loop
    return res.status(200).send('EVENT_RECEIVED');

  } catch (err: any) {
    console.error('[WhatsApp Webhook] Error processing event:', err?.message || err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
