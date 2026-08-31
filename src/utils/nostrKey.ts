/**
 * Nostr NIP-19 & NIP-05 Public Key Utility
 * Pure TypeScript, zero-dependency implementation of Bech32 encoding/decoding
 * for 32-byte hexadecimal Nostr public keys.
 */

const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const ALPHABET_MAP: Record<string, number> = {};
for (let i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET[i]] = i;
}

const GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

function polymod(values: number[]): number {
  let chk = 1;
  for (let p = 0; p < values.length; ++p) {
    const top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ values[p];
    for (let i = 0; i < 5; ++i) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i];
      }
    }
  }
  return chk;
}

function hrpExpand(hrp: string): number[] {
  const ret: number[] = [];
  for (let p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) >> 5);
  }
  ret.push(0);
  for (let p = 0; p < hrp.length; ++p) {
    ret.push(hrp.charCodeAt(p) & 31);
  }
  return ret;
}

function verifyChecksum(hrp: string, data: number[]): boolean {
  return polymod(hrpExpand(hrp).concat(data)) === 1;
}

function createChecksum(hrp: string, data: number[]): number[] {
  const values = hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  const mod = polymod(values) ^ 1;
  const ret: number[] = [];
  for (let p = 0; p < 6; ++p) {
    ret.push((mod >> (5 * (5 - p))) & 31);
  }
  return ret;
}

function convertBits(
  data: number[] | Uint8Array,
  fromBits: number,
  toBits: number,
  pad: boolean
): number[] | null {
  let acc = 0;
  let bits = 0;
  const ret: number[] = [];
  const maxv = (1 << toBits) - 1;
  const maxAcc = (1 << (fromBits + toBits - 1)) - 1;

  for (let p = 0; p < data.length; ++p) {
    const value = data[p];
    if (value < 0 || value >> fromBits !== 0) {
      return null;
    }
    acc = ((acc << fromBits) | value) & maxAcc;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      ret.push((acc >> bits) & maxv);
    }
  }

  if (pad) {
    if (bits > 0) {
      ret.push((acc << (toBits - bits)) & maxv);
    }
  } else if (bits >= fromBits || ((acc << (toBits - bits)) & maxv)) {
    return null;
  }

  return ret;
}

/**
 * Decode a Bech32 string into HRP and raw data bytes
 */
export function decodeBech32(bechString: string): { hrp: string; data: Uint8Array } | null {
  const str = bechString.trim().toLowerCase();
  const pos = str.lastIndexOf('1');
  if (pos < 1 || pos + 7 > str.length || str.length > 1000) {
    return null;
  }

  const hrp = str.substring(0, pos);
  const data: number[] = [];
  for (let p = pos + 1; p < str.length; ++p) {
    const d = ALPHABET_MAP[str.charAt(p)];
    if (d === undefined) {
      return null;
    }
    data.push(d);
  }

  if (!verifyChecksum(hrp, data)) {
    return null;
  }

  const payload = data.slice(0, data.length - 6);
  const bytes = convertBits(payload, 5, 8, false);
  if (!bytes) {
    return null;
  }

  return { hrp, data: new Uint8Array(bytes) };
}

/**
 * Encode raw data bytes into Bech32 string with given HRP
 */
export function encodeBech32(hrp: string, data: Uint8Array): string {
  const words = convertBits(data, 8, 5, true);
  if (!words) {
    throw new Error('Bit conversion failed');
  }
  const checksum = createChecksum(hrp.toLowerCase(), words);
  const combined = words.concat(checksum);
  let result = hrp.toLowerCase() + '1';
  for (let i = 0; i < combined.length; ++i) {
    result += ALPHABET.charAt(combined[i]);
  }
  return result;
}

/**
 * Convert Uint8Array to lowercase hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  let hex = '';
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
  }
  return hex;
}

/**
 * Convert hex string to Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.trim().toLowerCase().replace(/^0x/, '');
  if (cleanHex.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(cleanHex)) {
    throw new Error('Geçersiz hexadecimal format');
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
}

/**
 * Convert NIP-19 npub string to 32-byte (64 character) hex string
 */
export function npubToHex(npub: string): string {
  const clean = npub.trim().toLowerCase();
  if (!clean.startsWith('npub1')) {
    throw new Error('npub adresi "npub1" ile başlamalıdır');
  }

  const decoded = decodeBech32(clean);
  if (!decoded || decoded.hrp !== 'npub') {
    throw new Error('Geçersiz npub Bech32 anahtarı veya hatalı checksum');
  }

  if (decoded.data.length !== 32) {
    throw new Error(`Beklenen 32-byte (256-bit) anahtar uzunluğu, bulunan: ${decoded.data.length} byte`);
  }

  return bytesToHex(decoded.data);
}

/**
 * Convert 32-byte (64 character) hex string to NIP-19 npub
 */
export function hexToNpub(hex: string): string {
  const clean = hex.trim().toLowerCase().replace(/^0x/, '');
  if (!/^[0-9a-f]{64}$/.test(clean)) {
    throw new Error('Hex anahtar tam 64 karakter (32 byte) olmalıdır');
  }
  const bytes = hexToBytes(clean);
  return encodeBech32('npub', bytes);
}

export interface KeyConversionResult {
  isValid: boolean;
  hex: string;
  npub: string;
  detectedType: 'npub' | 'hex' | 'invalid';
  error?: string;
}

/**
 * Universal pubkey converter: accepts npub or 64-char hex, returns both formats
 */
export function parseAndConvertPubkey(input: string): KeyConversionResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      isValid: false,
      hex: '',
      npub: '',
      detectedType: 'invalid',
      error: 'Lütfen bir npub veya hex anahtar girin.',
    };
  }

  // Check if input is npub
  if (trimmed.toLowerCase().startsWith('npub1')) {
    try {
      const hex = npubToHex(trimmed);
      const npub = trimmed.toLowerCase();
      return {
        isValid: true,
        hex,
        npub,
        detectedType: 'npub',
      };
    } catch (err: any) {
      return {
        isValid: false,
        hex: '',
        npub: '',
        detectedType: 'invalid',
        error: err.message || 'Geçersiz npub anahtarı.',
      };
    }
  }

  // Check if input is hex
  const cleanHex = trimmed.replace(/^0x/i, '').toLowerCase();
  if (/^[0-9a-f]{64}$/.test(cleanHex)) {
    try {
      const npub = hexToNpub(cleanHex);
      return {
        isValid: true,
        hex: cleanHex,
        npub,
        detectedType: 'hex',
      };
    } catch (err: any) {
      return {
        isValid: false,
        hex: '',
        npub: '',
        detectedType: 'invalid',
        error: err.message || 'Hex anahtar npub formatına dönüştürülemedi.',
      };
    }
  }

  // Incomplete or invalid
  if (/^[0-9a-f]+$/i.test(cleanHex)) {
    return {
      isValid: false,
      hex: '',
      npub: '',
      detectedType: 'invalid',
      error: `Eksik hex anahtarı: 64 karakter olmalı (şu an: ${cleanHex.length} karakter).`,
    };
  }

  return {
    isValid: false,
    hex: '',
    npub: '',
    detectedType: 'invalid',
    error: 'Tanınmayan anahtar formatı. npub1... veya 64 karakterlik hex giriniz.',
  };
}

/**
 * Generate standard NIP-05 /.well-known/nostr.json content
 */
export function generateNip05Json(
  name: string,
  hexPubkey: string,
  relays: string[] = ['wss://relay.nostr.org.tr', 'wss://relay.damus.io', 'wss://nos.lol']
): string {
  const cleanName = (name.trim() || '_').toLowerCase();
  const cleanHex = hexPubkey.trim().toLowerCase();

  const payload: {
    names: Record<string, string>;
    relays?: Record<string, string[]>;
  } = {
    names: {
      [cleanName]: cleanHex || '46f3c7bb33cc3019049b76dc89dbb96e34c247bdda68b6ad8632682793ff8a1a',
    },
  };

  const validRelays = relays.map((r) => r.trim()).filter(Boolean);
  if (validRelays.length > 0 && cleanHex) {
    payload.relays = {
      [cleanHex]: validRelays,
    };
  }

  return JSON.stringify(payload, null, 2);
}
