import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { supabase } from './supabase.service';

// Ensure environment variables are loaded
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

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

export const sendWhatsAppNotification = async (
  enquiryId: string,
  enquiryData?: EnquiryNotificationData
): Promise<{ success: boolean; messageId?: string; error?: string }> => {
  const isEnabled = process.env.ENABLE_WHATSAPP_NOTIFY === 'true';

  if (!isEnabled) {
    console.log(`[WhatsApp Service] Notifications are disabled (ENABLE_WHATSAPP_NOTIFY !== 'true') for enquiry: ${enquiryId}`);
    return { success: true };
  }

  try {
    let enquiry: EnquiryNotificationData | null = enquiryData || null;

    // 1. Fetch enquiry details from Supabase if not directly provided
    if (!enquiry) {
      try {
        const { data, error: fetchError } = await supabase
          .from('enquiries')
          .select('*')
          .eq('id', enquiryId)
          .single();

        if (!fetchError && data) {
          enquiry = data;
        } else if (fetchError) {
          console.warn(`[WhatsApp Service] Could not fetch enquiry from Supabase (${fetchError.message}), attempting fallback`);
        }
      } catch (err: any) {
        console.warn(`[WhatsApp Service] Supabase query bypassed: ${err?.message || 'Database unavailable'}`);
      }
    }

    if (!enquiry) {
      throw new Error(`Enquiry data not available for WhatsApp notification (ID: ${enquiryId})`);
    }

    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const recipient = process.env.WHATSAPP_RECIPIENT_PHONE || '8870620760';
    const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
    const templateLang = process.env.WHATSAPP_TEMPLATE_LANG || 'en_US';
    const apiVersion = process.env.WHATSAPP_API_VERSION || 'v21.0';

    if (!token || !phoneId) {
      throw new Error('WhatsApp notification is enabled but WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID is missing from environment variables.');
    }

    // Format recipient: WhatsApp Cloud API requires country code without '+' or non-digit characters
    let cleanRecipient = recipient.replace(/\D/g, '');
    if (cleanRecipient.length === 10) {
      cleanRecipient = `91${cleanRecipient}`; // Prepend India country code (+91) if 10-digit number is provided
    }

    // Formulate clean fallback message text
    const submissionDate = enquiry.date ? new Date(enquiry.date).toLocaleDateString() : new Date().toLocaleDateString();
    const textBody =
      `*New OSAAC Website Enquiry Received* 🚀\n\n` +
      `*Enquiry ID:* ${enquiry.id || enquiryId}\n` +
      `*Date:* ${submissionDate}\n` +
      `*Name:* ${enquiry.client_name || 'N/A'}\n` +
      `*Company:* ${enquiry.company_name || 'N/A'}\n` +
      `*Phone:* ${enquiry.phone || 'N/A'}\n` +
      `*Email:* ${enquiry.email || 'N/A'}\n` +
      `*Service:* ${enquiry.service || 'N/A'}\n` +
      `*Budget:* ${enquiry.budget || 'N/A'}\n` +
      `*Requirements:* ${enquiry.requirements || 'N/A'}\n` +
      `*Additional Info:* ${enquiry.additional_information || 'N/A'}`;

    const url = `https://graph.facebook.com/${apiVersion}/${phoneId}/messages`;

    let payload: any;

    if (templateName && templateName.trim() !== '') {
      // Approved Meta template format
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanRecipient,
        type: 'template',
        template: {
          name: templateName.trim(),
          language: { code: templateLang },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: enquiry.client_name || 'Client' },
                { type: 'text', text: enquiry.company_name || 'N/A' },
                { type: 'text', text: enquiry.phone || 'N/A' },
                { type: 'text', text: enquiry.email || 'N/A' },
                { type: 'text', text: enquiry.service || 'N/A' },
                { type: 'text', text: enquiry.budget || 'N/A' },
                { type: 'text', text: enquiry.id || enquiryId || 'N/A' }
              ]
            }
          ]
        }
      };
    } else {
      // Standard session/text format
      payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanRecipient,
        type: 'text',
        text: {
          preview_url: false,
          body: textBody
        }
      };
    }

    // Send HTTP POST request to Meta WhatsApp Cloud API
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 12000
    });

    const messageId = response.data?.messages?.[0]?.id;
    console.log(`[WhatsApp Service] Notification sent successfully for enquiry ${enquiryId}. Message ID: ${messageId || 'unknown'}`);

    // Update status in Supabase if configured (non-blocking)
    try {
      await supabase
        .from('enquiries')
        .update({ whatsapp_status: 'Sent' })
        .eq('id', enquiryId);
    } catch (dbErr) {
      // Non-fatal
    }

    return { success: true, messageId };

  } catch (error: any) {
    // Extract sanitized error information without leaking tokens or sensitive headers
    const metaError = error.response?.data?.error;
    const safeErrorMessage = metaError?.message || error.message || 'WhatsApp Cloud API request failed';
    const errorCode = metaError?.code;
    const errorSubcode = metaError?.error_subcode;

    console.error(`[WhatsApp Service] Delivery error for enquiry ${enquiryId}:`, {
      message: safeErrorMessage,
      code: errorCode,
      subcode: errorSubcode,
      type: metaError?.type
    });

    // Record failure in Supabase if available (non-blocking)
    try {
      await supabase
        .from('enquiries')
        .update({ whatsapp_status: 'Failed' })
        .eq('id', enquiryId);
    } catch (dbErr) {
      // Non-fatal
    }

    return { success: false, error: safeErrorMessage };
  }
};
