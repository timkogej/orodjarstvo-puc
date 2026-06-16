import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  // Read the logo from disk at build time and embed it as a data URL so the
  // icon never depends on the live domain being reachable.
  const logo = await readFile(
    join(process.cwd(), 'public/images/orodjarstvo-puc-logo.png')
  );
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B0F14',
        }}
      >
        <img
          src={logoSrc}
          width={28}
          height={28}
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
