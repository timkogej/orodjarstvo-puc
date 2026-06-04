'use server';

import { Resend } from 'resend';
import { renderInquiryEmail, renderInquiryEmailText } from '@/app/emails/inquiry-notification';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================================
// TEST MODE — set to false when ready for production
// ============================================================
const TEST_MODE = true;

// IMPORTANT: With Resend's `onboarding@resend.dev` (unverified test sender),
// you can ONLY send emails to the email address you registered your Resend
// account with. For Tim, that is tim.kogej@jedroplus.com.
// To send to any other address (including @gmail.com), you must first
// verify a domain at https://resend.com/domains.
const TEST_RECIPIENT = 'tim.kogej@jedroplus.com';
const PRODUCTION_RECIPIENT = 'orodjarstvo.puc@gmail.com';

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'dwg', 'dxf', 'step', 'stp', 'iges', 'igs', 'zip'];
const MAX_FILES = 3;
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10 MB

export async function sendInquiry(formData: FormData) {
  const ime = (formData.get('ime') as string)?.trim() ?? '';
  const podjetje = (formData.get('podjetje') as string)?.trim() ?? '';
  const email = (formData.get('email') as string)?.trim() ?? '';
  const telefon = (formData.get('telefon') as string)?.trim() ?? '';
  const storitev = (formData.get('storitev') as string)?.trim() ?? '';
  const sporocilo = (formData.get('sporocilo') as string)?.trim() ?? '';

  if (!ime || !email || !sporocilo) {
    return {
      success: false,
      message: 'Manjkajo obvezna polja (ime, email, sporočilo).',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Email naslov ni v veljavni obliki.',
    };
  }

  const rawFiles = formData.getAll('files') as File[];
  const validFiles = rawFiles.filter(
    (f) => f instanceof File && f.size > 0
  );

  if (validFiles.length > MAX_FILES) {
    return {
      success: false,
      message: `Največ ${MAX_FILES} datoteke.`,
    };
  }

  const totalSize = validFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    return {
      success: false,
      message: 'Skupna velikost datotek presega 10 MB.',
    };
  }

  for (const file of validFiles) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        success: false,
        message: `Datoteka "${file.name}" ima nedovoljen format.`,
      };
    }
  }

  const MIME_TYPES: Record<string, string> = {
    pdf: 'application/pdf',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    dwg: 'application/acad',
    dxf: 'application/dxf',
    step: 'application/step',
    stp: 'application/step',
    iges: 'application/iges',
    igs: 'application/iges',
    zip: 'application/zip',
  };

  function getContentType(filename: string, fallbackType?: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext && MIME_TYPES[ext]) return MIME_TYPES[ext];
    if (fallbackType && fallbackType !== '') return fallbackType;
    return 'application/octet-stream';
  }

  const resendAttachments = await Promise.all(
    validFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Content = buffer.toString('base64');
      const contentType = getContentType(file.name, file.type);

      console.log(`[sendInquiry] Preparing attachment: ${file.name} (${file.size} bytes, ${contentType})`);

      return {
        filename: file.name,
        content: base64Content,
        contentType,
      };
    })
  );

  console.log(`[sendInquiry] Total attachments prepared: ${resendAttachments.length}`);

  const templateAttachments = validFiles.map((f) => ({
    filename: f.name,
    sizeBytes: f.size,
  }));

  const recipient = TEST_MODE ? TEST_RECIPIENT : PRODUCTION_RECIPIENT;
  const subjectPrefix = TEST_MODE ? '[TEST] ' : '';
  const subject = `${subjectPrefix}Novo povpraševanje od ${ime}${podjetje ? ` (${podjetje})` : ''}`;

  const htmlBody = renderInquiryEmail({
    ime,
    podjetje: podjetje || undefined,
    email,
    telefon: telefon || undefined,
    storitev: storitev || undefined,
    sporocilo,
    attachments: templateAttachments,
    testMode: TEST_MODE,
  });

  const textBody = renderInquiryEmailText({
    ime,
    podjetje: podjetje || undefined,
    email,
    telefon: telefon || undefined,
    storitev: storitev || undefined,
    sporocilo,
    attachments: templateAttachments,
    testMode: TEST_MODE,
  });

  console.log(`[sendInquiry] Sending email to: ${recipient}`);
  console.log(`[sendInquiry] Attachments count: ${resendAttachments.length}`);
  console.log(`[sendInquiry] Subject: ${subject}`);

  try {
    const { data, error } = await resend.emails.send({
      from: 'Orodjarstvo Puc <onboarding@resend.dev>',
      to: [recipient],
      replyTo: email,
      subject,
      html: htmlBody,
      text: textBody,
      attachments: resendAttachments.length > 0 ? resendAttachments : undefined,
    });

    if (error) {
      console.error('[sendInquiry] Resend returned error:', JSON.stringify(error, null, 2));
      return {
        success: false,
        message: 'Pri pošiljanju je prišlo do napake. Poskusite znova ali pokličite na 031 252 353.',
      };
    }

    console.log(`[sendInquiry] ✅ Email sent successfully. Resend ID: ${data?.id}`);

    return {
      success: true,
      message: 'Povpraševanje poslano. Odgovorili bomo v 24 urah.',
    };
  } catch (error) {
    console.error('[sendInquiry] Unexpected error sending email:', error);
    return {
      success: false,
      message: 'Pri pošiljanju je prišlo do napake. Poskusite znova ali pokličite na 031 252 353.',
    };
  }
}
