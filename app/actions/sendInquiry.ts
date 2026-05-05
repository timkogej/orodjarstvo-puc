'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'dwg', 'dxf', 'step', 'stp', 'iges', 'igs', 'zip'];
const MAX_FILES = 3;
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10 MB

export async function sendInquiry(formData: FormData) {
  const ime = formData.get('ime') as string;
  const podjetje = formData.get('podjetje') as string;
  const email = formData.get('email') as string;
  const telefon = formData.get('telefon') as string;
  const storitev = formData.get('storitev') as string;
  const sporocilo = formData.get('sporocilo') as string;

  if (!ime || !email || !sporocilo) {
    return { success: false, message: 'Manjkajo obvezna polja.' };
  }

  const files = formData.getAll('files') as File[];
  const validFiles = files.filter((f) => f instanceof File && f.size > 0);

  if (validFiles.length > MAX_FILES) {
    return { success: false, message: `Največ ${MAX_FILES} datoteke.` };
  }

  const totalSize = validFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_SIZE) {
    return { success: false, message: 'Skupna velikost datotek presega 10 MB.' };
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

  const attachments = await Promise.all(
    validFiles.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return { filename: file.name, content: buffer };
    }),
  );

  try {
    await resend.emails.send({
      from: 'Spletna stran <onboarding@resend.dev>',
      to: ['orodjarstvo.puc@gmail.com'],
      replyTo: email,
      subject: `Novo povpraševanje od ${ime}${podjetje ? ` (${podjetje})` : ''}`,
      html: `
        <h2>Novo povpraševanje s spletne strani</h2>
        <p><strong>Ime:</strong> ${ime}</p>
        ${podjetje ? `<p><strong>Podjetje:</strong> ${podjetje}</p>` : ''}
        <p><strong>Email:</strong> ${email}</p>
        ${telefon ? `<p><strong>Telefon:</strong> ${telefon}</p>` : ''}
        ${storitev ? `<p><strong>Storitev:</strong> ${storitev}</p>` : ''}
        <p><strong>Sporočilo:</strong></p>
        <p>${sporocilo.replace(/\n/g, '<br/>')}</p>
        ${validFiles.length > 0 ? `<p><strong>Priložene datoteke:</strong> ${validFiles.length}</p>` : ''}
      `,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return {
      success: true,
      message: 'Povpraševanje poslano. Odgovorili bomo v 24 urah.',
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      message: 'Pri pošiljanju je prišlo do napake. Poskusite znova ali pokličite na 031 252 353.',
    };
  }
}
