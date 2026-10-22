import twilio from 'twilio';
import dotenv from 'dotenv';
import path from 'path';
import { supabase } from './supabase.service';

// Ensure environment variables are loaded
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

/**
 * Format Date in Asia/Kolkata timezone: YYYY-MM-DD
 */
export const formatDateKolkata = (date?: Date | string): string => {
  const d = date ? new Date(date) : new Date();
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d);
  } catch {
    return d.toISOString().substring(0, 10);
  }
};

/**
 * Format Time in Asia/Kolkata timezone: HH:mm:ss
 */
export const formatTimeKolkata = (date?: Date | string): string => {
  const d = date ? new Date(date) : new Date();
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(d);
  } catch {
    return d.toISOString().substring(11, 19);
  }
};

export interface EnquiryNotificationData {
  id?: string;
  date?: string | Date;
  client_name?: string;
  company_name?: string | null;
  phone?: string;
  email?: string;
  service?: string;
  budget?: string | null;
  requirements?: string;
  additional_information?: string | null;
  [key: string]: any;
}

/**
 * Normalizes phone numbers to standard Twilio WhatsApp URI format: whatsapp:+<E.164>
 * Handles spaces, missing '+' or 'whatsapp:' prefix, and 10-digit Indian numbers.
 */
export const formatTwilioWhatsAppNumber = (input?: string, isRecipient = false): string => {
  if (!input) return '';
  const trimmed = input.trim();
  // Strip any existing 'whatsapp:' prefix to inspect the raw digits
  const raw = trimmed.replace(/^whatsapp:/i, '').trim();

  const digitsOnly = raw.replace(/\D/g, '');

  // If 10-digit Indian mobile number is provided as recipient, prepend +91
  if (isRecipient && digitsOnly.length === 10) {
    return `whatsapp:+91${digitsOnly}`;
  }

  // If number does not start with '+', add '+'
  if (!raw.startsWith('+')) {
    if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
      return `whatsapp:+${digitsOnly}`;
    }
    if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      return `whatsapp:+${digitsOnly}`;
    }
    return `whatsapp:+${digitsOnly}`;
  }

  // If already starts with '+', keep '+' and remove any intervening spaces or symbols
  const cleanDigits = raw.replace(/[^\d+]/g, '');
  return `whatsapp:${cleanDigits}`;
};

/**
 * Builds formatted text for enquiry notifications
 */
export const buildEnquiryNotificationText = (
  enquiry: EnquiryNotificationData,
  enquiryId: string
): string => {
  const formattedDate = enquiry.date
    ? `${formatDateKolkata(enquiry.date)} ${formatTimeKolkata(enquiry.date)} (IST)`
    : `${formatDateKolkata()} ${formatTimeKolkata()} (IST)`;

  return (
    `*New OSAAC Website Enquiry* 🚀\n\n` +
    `*Enquiry ID:* ${enquiry.id || enquiryId}\n` +
    `*Date & Time:* ${formattedDate}\n` +
    `*Client Name:* ${enquiry.client_name || 'N/A'}\n` +
    `*Phone:* ${enquiry.phone || 'N/A'}\n` +
    `*Email:* ${enquiry.email || 'N/A'}\n` +
    `*Company:* ${enquiry.company_name || 'N/A'}\n` +
    `*Service:* ${enquiry.service || 'N/A'}\n` +
    `*Budget:* ${enquiry.budget || 'N/A'}\n\n` +
    `*Project Requirements:*\n${enquiry.requirements || 'N/A'}\n\n` +
    `*Additional Info:*\n${enquiry.additional_information || 'N/A'}`
  );
};

/**
 * Sends enquiry details to recipient via Twilio WhatsApp Sandbox
 */
export const sendWhatsAppNotification = async (
  enquiryId: string,
  enquiryData?: EnquiryNotificationData
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  // If explicitly disabled via flag, skip gracefully
  if (process.env.ENABLE_WHATSAPP_NOTIFY === 'false') {
    console.log(`[Twilio WhatsApp] Notifications disabled via ENABLE_WHATSAPP_NOTIFY=false for enquiry: ${enquiryId}`);
    return { success: true };
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const rawFrom = process.env.TWILIO_WHATSAPP_FROM;
  const rawTo = process.env.TWILIO_WHATSAPP_TO;

  // Check required configuration safely without exposing secrets
  if (!accountSid || !authToken || !rawFrom || !rawTo) {
    const missingKeys: string[] = [];
    if (!accountSid) missingKeys.push('TWILIO_ACCOUNT_SID');
    if (!authToken) missingKeys.push('TWILIO_AUTH_TOKEN');
    if (!rawFrom) missingKeys.push('TWILIO_WHATSAPP_FROM');
    if (!rawTo) missingKeys.push('TWILIO_WHATSAPP_TO');

    console.warn(`[Twilio WhatsApp] Missing required Twilio configuration: ${missingKeys.join(', ')}`);
    return {
      success: false,
      error: `Twilio configuration missing: ${missingKeys.join(', ')}`,
    };
  }

  const fromNumber = formatTwilioWhatsAppNumber(rawFrom, false);
  const toNumber = formatTwilioWhatsAppNumber(rawTo, true);

  try {
    let enquiry: EnquiryNotificationData | null = enquiryData || null;

    // Fetch from Supabase if not directly provided
    if (!enquiry) {
      try {
        const { data, error: fetchError } = await supabase
          .from('enquiries')
          .select('*')
          .eq('id', enquiryId)
          .single();

        if (!fetchError && data) {
          enquiry = data;
        }
      } catch (err: any) {
        console.warn(`[Twilio WhatsApp] Supabase query bypassed: ${err?.message || 'Database unavailable'}`);
      }
    }

    if (!enquiry) {
      console.warn(`[Twilio WhatsApp] Enquiry data unavailable for ID: ${enquiryId}`);
      return { success: false, error: `Enquiry data not available for ID: ${enquiryId}` };
    }

    const messageBody = buildEnquiryNotificationText(enquiry, enquiryId);

    // Initialize Twilio client
    const client = twilio(accountSid, authToken);

    // Construct dispatch payload supporting both Content Template SID and standard free-form body
    const messagePayload: any = {
      from: fromNumber,
      to: toNumber,
    };

    if (process.env.TWILIO_CONTENT_SID) {
      messagePayload.contentSid = process.env.TWILIO_CONTENT_SID;
      if (process.env.TWILIO_CONTENT_VARIABLES) {
        messagePayload.contentVariables = process.env.TWILIO_CONTENT_VARIABLES;
      } else {
        messagePayload.contentVariables = JSON.stringify({
          '1': enquiry.client_name || 'Valued Client',
          '2': enquiry.phone || 'N/A',
          '3': enquiry.service || 'General Enquiry',
        });
      }
    } else {
      messagePayload.body = messageBody;
    }

    // Dispatch message via Twilio WhatsApp API
    const response = await client.messages.create(messagePayload);

    console.log(`[Twilio WhatsApp] Notification sent successfully for enquiry ${enquiryId}. Message SID: ${response.sid}`);

    // Update Supabase status if available (non-blocking)
    try {
      await supabase
        .from('enquiries')
        .update({ whatsapp_status: 'Sent' })
        .eq('id', enquiryId);
    } catch {
      // Non-fatal
    }

    return { success: true, messageId: response.sid };

  } catch (error: any) {
    // Sanitize error reporting without printing credentials
    const errorCode = error.code || error.status;
    const safeErrorMessage = error.message || 'Unknown Twilio error';

    console.error(`[Twilio WhatsApp] Delivery error for enquiry ${enquiryId}:`, {
      code: errorCode,
      message: safeErrorMessage,
    });

    // Provide specific guidance based on Twilio error codes
    if (errorCode === 21654) {
      console.warn(
        `[Twilio WhatsApp] Error 21654 (ContentSid Required): ` +
        `WhatsApp requires a pre-approved template for business-initiated messages outside the 24-hour window. ` +
        `To send free-form messages, send a message (e.g. "Hi") from ${toNumber} to ${fromNumber} to activate the 24-hour conversation session, or configure TWILIO_CONTENT_SID in Render.`
      );
    } else if (errorCode === 63007 || errorCode === 63015) {
      console.warn(
        `[Twilio WhatsApp] Recipient (${toNumber}) has not joined the Twilio WhatsApp Sandbox yet. ` +
        `Send the sandbox join keyword from your WhatsApp to ${fromNumber} to enable delivery.`
      );
    } else if (errorCode === 63016) {
      console.warn(
        `[Twilio WhatsApp] Error 63016: The 24-hour messaging window has closed. Send a message from your WhatsApp to ${fromNumber} to reopen the window.`
      );
    }

    // Update Supabase status if available (non-blocking)
    try {
      await supabase
        .from('enquiries')
        .update({ whatsapp_status: 'Failed' })
        .eq('id', enquiryId);
    } catch {
      // Non-fatal
    }

    return { success: false, error: safeErrorMessage };
  }
};
