'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type State = { success: boolean; message: string } | null;

export async function sendInquiry(prevState: State, formData: FormData): Promise<State> {
  const ime = formData.get('ime') as string;
  const podjetje = formData.get('podjetje') as string;
  const email = formData.get('email') as string;
  const telefon = formData.get('telefon') as string;
  const storitev = formData.get('storitev') as string;
  const sporocilo = formData.get('sporocilo') as string;

  if (!ime || !email || !sporocilo) {
    return { success: false, message: 'Manjkajo obvezna polja.' };
  }

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
      `,
    });
    return { success: true, message: 'Povpraševanje poslano. Odgovorili bomo v 24 urah.' };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Pri pošiljanju je prišlo do napake. Poskusite znova ali pokličite na 031 252 353.',
    };
  }
}
