'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '@/lib/easing';
import {
  Mail, Phone, MapPin, Clock,
  Send, Check, ArrowUpRight,
  Upload, FileText, X, Loader2,
} from 'lucide-react';
import { sendInquiry } from '@/app/actions/sendInquiry';
import { ContactRow } from './ui/ContactRow';
import { FormField } from './ui/FormField';
import { CustomSelect } from './ui/CustomSelect';
import { CONTACT_INFO } from '@/lib/constants';

const CONTACT_ROWS = [
  { Icon: Mail, label: 'ELEKTRONSKA POŠTA', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { Icon: Phone, label: 'TELEFON', value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phoneTel}` },
  { Icon: MapPin, label: 'LOKACIJA', value: CONTACT_INFO.address, href: CONTACT_INFO.mapsUrl },
  { Icon: Clock, label: 'DELOVNI ČAS', value: CONTACT_INFO.hours },
];

const SERVICE_OPTIONS = [
  { value: 'cnc-rezkanje', label: 'CNC Rezkanje' },
  { value: 'cnc-struzenje', label: 'CNC Struženje' },
  { value: 'brusenje', label: 'Brušenje' },
  { value: 'orodjarstvo', label: 'Orodjarstvo' },
  { value: 'izdelava-po-nacrtih', label: 'Izdelava po načrtih' },
  { value: 'hitro-prototipiranje', label: 'Hitro prototipiranje' },
  { value: 'drugo', label: 'Drugo / več storitev' },
];

const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png,.dwg,.dxf,.step,.stp,.iges,.igs,.zip';
const MAX_FILES = 3;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const inputClass =
  'w-full bg-transparent py-3 text-[15px] text-brand-bg outline-none placeholder:text-brand-text-dim-light/50';

export function Contact() {
  const [storitev, setStoritev] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;
    const combined = [...files, ...selectedFiles];
    if (combined.length > MAX_FILES) {
      setFileError(`Največ ${MAX_FILES} datoteke hkrati.`);
      return;
    }
    const totalSize = combined.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_SIZE_BYTES) {
      setFileError(`Skupna velikost datotek presega ${MAX_SIZE_MB} MB.`);
      return;
    }
    setFiles(combined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setFileError('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    const formData = new FormData(e.currentTarget);
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const result = await sendInquiry(formData);
      setSubmitResult(result);
      if (result.success) {
        setStoritev('');
        setFiles([]);
        (e.currentTarget as HTMLFormElement).reset();
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'Pri pošiljanju je prišlo do napake. Poskusite znova ali pokličite na 031 252 353.',
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setSubmitResult(null), 6000);
    }
  };

  return (
    <section id="kontakt" className="relative bg-brand-light py-24 lg:py-36">
      <div className="absolute inset-0 grid-lines-light opacity-70 pointer-events-none" />

      <div className="relative z-10 max-w-container mx-auto container-pad">
        {/* Header */}
        <div className="max-w-4xl mb-14 lg:mb-20">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            <div className="w-8 h-px bg-brand-accent flex-shrink-0" />
            <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-brand-text-dim-light">
              05 — KONTAKT
            </span>
          </motion.div>
          <motion.h2
            className="font-display font-extrabold tracking-tighter text-brand-bg leading-[0.98]"
            style={{ fontSize: 'clamp(2rem, 4.6vw, 4rem)', letterSpacing: '-0.05em' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.05 }}
          >
            Imate projekt?
            <br />
            <span className="text-brand-accent">Pogovorimo se.</span>
          </motion.h2>
          <motion.p
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#3B4552]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
          >
            Pošljite nam povpraševanje, tehnične risbe ali samo idejo. Odgovorili bomo v roku 24 ur
            in pripravili realistično ponudbo z jasnimi roki.
          </motion.p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <div className="space-y-8">
              {CONTACT_ROWS.map(({ Icon, label, value, href }, i) => (
                <ContactRow key={i} Icon={Icon} label={label} value={value} href={href} />
              ))}
            </div>

            {/* Urgent CTA card */}
            <div className="mt-12 relative overflow-hidden bg-brand-bg text-white p-8">
              <div
                className="absolute -right-10 -top-10 rounded-full pointer-events-none"
                style={{
                  width: 160,
                  height: 160,
                  background: '#2E6BFF33',
                  filter: 'blur(40px)',
                }}
              />
              <div className="relative z-10">
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase opacity-70 mb-3">
                  NUJNA NAROČILA
                </div>
                <div
                  className="font-display font-bold leading-snug mb-4"
                  style={{ fontSize: '18px' }}
                  dangerouslySetInnerHTML={{
                    __html: 'Urgentno povpraševanje?<br />Pokličite nas direktno.',
                  }}
                />
                <a
                  href={`tel:${CONTACT_INFO.phoneTel}`}
                  className="inline-flex items-center gap-2 font-mono text-[13px] text-brand-accent border-b border-brand-accent pb-px hover:opacity-80 transition-opacity"
                >
                  {CONTACT_INFO.phone}
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
          >
            <form onSubmit={onSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Ime in priimek *">
                  <input
                    type="text"
                    name="ime"
                    required
                    className={inputClass}
                    placeholder="Jana Novak"
                  />
                </FormField>
                <FormField label="Podjetje">
                  <input
                    type="text"
                    name="podjetje"
                    className={inputClass}
                    placeholder="Vaše podjetje d.o.o."
                  />
                </FormField>
              </div>

              {/* Row 2 */}
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Email *">
                  <input
                    type="email"
                    name="email"
                    required
                    className={inputClass}
                    placeholder="jana@podjetje.si"
                  />
                </FormField>
                <FormField label="Telefon">
                  <input
                    type="tel"
                    name="telefon"
                    className={inputClass}
                    placeholder="+386 ..."
                  />
                </FormField>
              </div>

              {/* Row 3 */}
              <FormField label="Katera storitev vas zanima?">
                <CustomSelect
                  name="storitev"
                  value={storitev}
                  onChange={setStoritev}
                  placeholder="Izberite storitev..."
                  options={SERVICE_OPTIONS}
                />
              </FormField>

              {/* Row 4 */}
              <FormField label="Opis projekta / sporočilo *">
                <textarea
                  name="sporocilo"
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Opišite vaš projekt, zahteve ali vprašanje..."
                />
              </FormField>

              {/* File upload */}
              <FormField label="Priložite načrt, sliko ali drugo datoteko (neobvezno)">
                <div className="pt-3 pb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={files.length >= MAX_FILES}
                    className="inline-flex items-center gap-3 px-5 py-3 border border-brand-bg-line bg-white hover:border-brand-accent hover:bg-brand-accent/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ borderRadius: 2 }}
                  >
                    <Upload size={16} className="text-brand-accent" />
                    <span className="font-mono text-[12px] tracking-[0.16em] uppercase text-brand-bg">
                      {files.length === 0 ? 'Izberi datoteke' : 'Dodaj še datoteko'}
                    </span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={ACCEPTED_EXTENSIONS}
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <p className="mt-3 font-mono text-[10.5px] tracking-[0.14em] uppercase text-brand-text-dim-light">
                    Do {MAX_FILES} datoteke · Skupaj največ {MAX_SIZE_MB} MB · PDF, JPG, PNG, DWG, DXF, STEP, IGES, ZIP
                  </p>

                  {fileError && (
                    <p className="mt-2 text-[12.5px] text-red-600 font-medium">{fileError}</p>
                  )}

                  {files.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {files.map((file, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-brand-bg-line"
                          style={{ borderRadius: 2 }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText size={16} className="flex-shrink-0 text-brand-accent" />
                            <div className="min-w-0">
                              <div className="text-[14px] font-medium text-brand-bg truncate">
                                {file.name}
                              </div>
                              <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-brand-text-dim-light">
                                {formatFileSize(file.size)}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-brand-text-dim-light hover:text-red-600 transition-colors"
                            aria-label="Odstrani datoteko"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormField>

              {/* Form footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                <span className="text-[12px] font-mono text-brand-text-dim-light">
                  * Obvezna polja · Odgovor v 24 urah
                </span>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex items-center justify-center gap-2.5 px-7 py-4 text-[14px] font-semibold disabled:opacity-70"
                  style={{
                    borderRadius: 2,
                    background: submitResult?.success ? '#2E6BFF' : '#0B0F14',
                    color: '#fff',
                  }}
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Pošiljanje...
                    </>
                  ) : submitResult?.success ? (
                    <>
                      <Check size={16} />
                      Povpraševanje poslano
                    </>
                  ) : (
                    <>
                      Pošlji povpraševanje
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>

              {submitResult && !submitResult.success && (
                <p className="mt-3 text-[13px] text-red-600 font-medium">
                  {submitResult.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
