export type InquiryData = {
  ime: string;
  podjetje?: string;
  email: string;
  telefon?: string;
  storitev?: string;
  sporocilo: string;
  attachments?: Array<{ filename: string; sizeBytes: number }>;
  testMode?: boolean;
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatDateTime(date: Date): string {
  const d = date.toLocaleDateString('sl-SI', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const t = date.toLocaleTimeString('sl-SI', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${d} ob ${t}`;
}

const SERVICE_LABELS: Record<string, string> = {
  'cnc-rezkanje': 'CNC Rezkanje',
  'cnc-struzenje': 'CNC Struženje',
  'brusenje': 'Brušenje',
  'orodjarstvo': 'Orodjarstvo',
  'izdelava-po-nacrtih': 'Izdelava po načrtih',
  'hitro-prototipiranje': 'Hitro prototipiranje',
  'drugo': 'Drugo / več storitev',
};

export function renderInquiryEmail(data: InquiryData): string {
  const {
    ime, podjetje, email, telefon, storitev, sporocilo,
    attachments = [], testMode = false,
  } = data;

  const safeIme = escapeHtml(ime);
  const safePodjetje = podjetje ? escapeHtml(podjetje) : '';
  const safeEmail = escapeHtml(email);
  const safeTelefon = telefon ? escapeHtml(telefon) : '';
  const serviceLabel = storitev && SERVICE_LABELS[storitev]
    ? escapeHtml(SERVICE_LABELS[storitev])
    : '';
  const safeMessage = escapeHtml(sporocilo).replace(/\n/g, '<br>');

  const timestamp = formatDateTime(new Date());

  const contactRows: string[] = [];
  contactRows.push(`
    <tr>
      <td width="100" style="color:#6B7280;font-size:11px;font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;letter-spacing:0.14em;text-transform:uppercase;padding:8px 16px 8px 0;vertical-align:top;">Ime</td>
      <td style="color:#0B0F14;font-size:15px;font-weight:600;line-height:1.5;padding:8px 0;">${safeIme}</td>
    </tr>`);

  if (safePodjetje) {
    contactRows.push(`
      <tr>
        <td width="100" style="color:#6B7280;font-size:11px;font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;letter-spacing:0.14em;text-transform:uppercase;padding:8px 16px 8px 0;vertical-align:top;">Podjetje</td>
        <td style="color:#0B0F14;font-size:15px;font-weight:500;line-height:1.5;padding:8px 0;">${safePodjetje}</td>
      </tr>`);
  }

  contactRows.push(`
    <tr>
      <td width="100" style="color:#6B7280;font-size:11px;font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;letter-spacing:0.14em;text-transform:uppercase;padding:8px 16px 8px 0;vertical-align:top;">Email</td>
      <td style="font-size:15px;line-height:1.5;padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#2E6BFF;font-weight:500;text-decoration:none;">${safeEmail}</a></td>
    </tr>`);

  if (safeTelefon) {
    const telDigits = telefon!.replace(/[^0-9+]/g, '');
    contactRows.push(`
      <tr>
        <td width="100" style="color:#6B7280;font-size:11px;font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;letter-spacing:0.14em;text-transform:uppercase;padding:8px 16px 8px 0;vertical-align:top;">Telefon</td>
        <td style="font-size:15px;line-height:1.5;padding:8px 0;"><a href="tel:${escapeHtml(telDigits)}" style="color:#2E6BFF;font-weight:500;text-decoration:none;">${safeTelefon}</a></td>
      </tr>`);
  }

  let attachmentsBlock = '';
  if (attachments.length > 0) {
    const fileItems = attachments.map(att => `
      <tr>
        <td style="padding:10px 14px;background:#F8F7F4;border:1px solid #E5E5E5;border-radius:2px;margin-bottom:6px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td width="24" style="vertical-align:middle;padding-right:12px;">
                <div style="width:24px;height:24px;background:#2E6BFF;border-radius:2px;text-align:center;color:#FFFFFF;font-size:11px;font-weight:700;line-height:24px;font-family:'SF Mono',Menlo,monospace;">&#128206;</div>
              </td>
              <td style="vertical-align:middle;">
                <div style="color:#0B0F14;font-size:14px;font-weight:600;line-height:1.3;">${escapeHtml(att.filename)}</div>
                <div style="color:#6B7280;font-size:11px;font-family:'SF Mono',Menlo,monospace;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px;">${formatFileSize(att.sizeBytes)}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="height:6px;line-height:6px;font-size:6px;">&nbsp;</td></tr>
    `).join('');

    attachmentsBlock = `
      <tr>
        <td style="padding:0 32px;">
          <div style="border-top:1px solid #E5E5E5;padding-top:28px;margin-top:8px;"></div>
          <div style="color:#6B7280;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-family:'SF Mono',Menlo,Consolas,monospace;margin-bottom:14px;">
            Prilo&#382;ene datoteke &mdash; ${attachments.length}
          </div>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            ${fileItems}
          </table>
          <p style="color:#6B7280;font-size:12px;line-height:1.5;margin:12px 0 0;font-style:italic;">
            Datoteke so prilo&#382;ene k temu email sporo&#269;ilu kot attachmenti.
          </p>
        </td>
      </tr>
    `;
  }

  const testBanner = testMode ? `
    <tr>
      <td style="background:#FFB800;padding:14px 24px;text-align:center;">
        <div style="color:#0B0F14;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;font-family:'SF Mono',Menlo,Consolas,monospace;">
          &#9888;&#65039; Test na&#269;in &mdash; preverjanje po&#353;iljanja
        </div>
      </td>
    </tr>
  ` : '';

  const serviceBlock = serviceLabel ? `
    <tr>
      <td width="120" style="color:#6B7280;font-size:11px;font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;letter-spacing:0.14em;text-transform:uppercase;padding:8px 16px 8px 0;vertical-align:top;">Storitev</td>
      <td style="padding:8px 0;">
        <span style="display:inline-block;background:#2E6BFF;color:#FFFFFF;padding:5px 11px;font-size:13px;font-weight:600;letter-spacing:-0.005em;border-radius:2px;">${serviceLabel}</span>
      </td>
    </tr>
  ` : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="sl">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>Novo povpra&#353;evanje</title>
  <!--[if mso]>
  <style type="text/css">
    table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#F4F1EC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;">

  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Novo povpra&#353;evanje od ${safeIme}${safePodjetje ? ` (${safePodjetje})` : ''} &mdash; odgovorite v 24 urah.
  </div>

  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#F4F1EC;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #E5E5E5;border-radius:4px;overflow:hidden;">

          ${testBanner}

          <!-- HEADER -->
          <tr>
            <td style="background:#0B0F14;padding:28px 32px;">
              <div style="color:#FFFFFF;font-size:16px;font-weight:700;letter-spacing:-0.02em;line-height:1.2;">Orodjarstvo Puc d.o.o.</div>
            </td>
          </tr>

          <!-- TITLE -->
          <tr>
            <td style="padding:40px 32px 0;">
              <div style="margin-bottom:14px;">
                <span style="display:inline-block;width:24px;height:1px;background:#2E6BFF;vertical-align:middle;margin-right:10px;line-height:1px;font-size:0;">&nbsp;</span>
                <span style="color:#6B7280;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;font-family:'SF Mono',Menlo,Consolas,monospace;vertical-align:middle;">Novo povpra&#353;evanje</span>
              </div>
              <h1 style="margin:0 0 12px;color:#0B0F14;font-size:26px;font-weight:800;letter-spacing:-0.035em;line-height:1.1;">
                Prejeli ste novo povpra&#353;evanje s spletne strani.
              </h1>
              <div style="color:#6B7280;font-size:12px;font-family:'SF Mono',Menlo,Consolas,monospace;letter-spacing:0.04em;margin-top:8px;">
                ${timestamp}
              </div>
            </td>
          </tr>

          <!-- CONTACT SECTION -->
          <tr>
            <td style="padding:36px 32px 0;">
              <div style="border-top:1px solid #E5E5E5;padding-top:28px;"></div>
              <div style="color:#6B7280;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-family:'SF Mono',Menlo,Consolas,monospace;margin-bottom:14px;">
                Kontaktni podatki
              </div>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${contactRows.join('')}
              </table>
            </td>
          </tr>

          <!-- INQUIRY SECTION -->
          <tr>
            <td style="padding:32px 32px 0;">
              <div style="border-top:1px solid #E5E5E5;padding-top:28px;"></div>
              <div style="color:#6B7280;font-size:10px;letter-spacing:0.24em;text-transform:uppercase;font-family:'SF Mono',Menlo,Consolas,monospace;margin-bottom:14px;">
                Povpra&#353;evanje
              </div>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                ${serviceBlock}
                <tr>
                  <td colspan="2" style="padding-top:${serviceLabel ? '14px' : '0'};">
                    <div style="color:#6B7280;font-size:11px;font-family:'SF Mono',Menlo,Consolas,'Courier New',monospace;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:10px;">Sporo&#269;ilo</div>
                    <div style="background:#F8F7F4;border-left:3px solid #2E6BFF;padding:18px 20px;color:#0B0F14;font-size:15px;line-height:1.65;border-radius:0 2px 2px 0;">
                      ${safeMessage}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${attachmentsBlock}

          <!-- CTA -->
          <tr>
            <td style="padding:36px 32px 8px;">
              <div style="border-top:1px solid #E5E5E5;padding-top:28px;"></div>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${safeEmail}?subject=Re%3A%20Va%C5%A1e%20povpra%C5%A1evanje%20%E2%80%93%20Orodjarstvo%20Puc" style="display:inline-block;background:#0B0F14;color:#FFFFFF;padding:16px 32px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:-0.01em;border-radius:2px;">
                      Odgovorite stranki &nbsp;&rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#6B7280;font-size:12px;line-height:1.5;text-align:center;margin:14px 0 0;">
                Klik na gumb odpre va&#353; email client z odgovorom na <strong style="color:#0B0F14;">${safeEmail}</strong>.<br>
                Lahko tudi enostavno odgovorite na to email sporo&#269;ilo (Reply-To je nastavljen).
              </p>
            </td>
          </tr>

          <!-- SPACER -->
          <tr><td style="height:32px;line-height:32px;font-size:32px;">&nbsp;</td></tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#F8F7F4;padding:24px 32px;border-top:1px solid #E5E5E5;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td>
                    <div style="color:#6B7280;font-size:11px;line-height:1.6;font-family:'SF Mono',Menlo,Consolas,monospace;letter-spacing:0.04em;">
                      Avtomatsko sporo&#269;ilo s spletne strani <span style="color:#0B0F14;font-weight:600;">orodjarstvo-puc.si</span><br>
                      Loka 14, 1370 Logatec &nbsp;&middot;&nbsp; 031 252 353 &nbsp;&middot;&nbsp; orodjarstvo.puc@gmail.com
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <!-- Outer footer -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;width:100%;margin-top:18px;">
          <tr>
            <td align="center" style="color:#8A94A3;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;font-family:'SF Mono',Menlo,Consolas,monospace;line-height:1.5;">
              Izdelava in dostava: Jedro Systems
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderInquiryEmailText(data: InquiryData): string {
  const lines: string[] = [];
  lines.push(data.testMode ? '⚠️ TEST NAČIN\n' : '');
  lines.push('NOVO POVPRAŠEVANJE — Orodjarstvo Puc');
  lines.push('========================================\n');
  lines.push(`Prejeto: ${formatDateTime(new Date())}\n`);
  lines.push('KONTAKTNI PODATKI');
  lines.push('-------------------');
  lines.push(`Ime:       ${data.ime}`);
  if (data.podjetje) lines.push(`Podjetje:  ${data.podjetje}`);
  lines.push(`Email:     ${data.email}`);
  if (data.telefon) lines.push(`Telefon:   ${data.telefon}`);
  lines.push('');
  lines.push('POVPRAŠEVANJE');
  lines.push('-------------------');
  if (data.storitev && SERVICE_LABELS[data.storitev]) {
    lines.push(`Storitev:  ${SERVICE_LABELS[data.storitev]}`);
    lines.push('');
  }
  lines.push('Sporočilo:');
  lines.push(data.sporocilo);
  lines.push('');
  if (data.attachments && data.attachments.length > 0) {
    lines.push('PRILOŽENE DATOTEKE');
    lines.push('-------------------');
    data.attachments.forEach(a => {
      lines.push(`- ${a.filename} (${formatFileSize(a.sizeBytes)})`);
    });
    lines.push('');
  }
  lines.push('---');
  lines.push('Orodjarstvo Puc d.o.o.  ·  Loka 14, 1370 Logatec  ·  031 252 353');
  return lines.join('\n');
}
