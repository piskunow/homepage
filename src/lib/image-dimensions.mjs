import { readFileSync } from "node:fs"

/**
 * Reads intrinsic pixel dimensions straight out of a PNG or JPEG header.
 *
 * Deliberately not a dependency: the published image-size package carries an
 * unfixed denial-of-service advisory in its ICNS/JXL/HEIF parsers, and the two
 * formats this site actually uses need about thirty lines between them.
 */
export function imageDimensions(file) {
  const buf = readFileSync(file)

  // PNG: 8-byte signature, then an IHDR chunk whose first two fields are the
  // width and height as big-endian uint32.
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }

  // JPEG: walk the marker segments to the start-of-frame, which carries the
  // dimensions. Markers are 0xFF-prefixed; SOF is C0..CF excluding the
  // DHT (C4), JPG (C8) and DAC (CC) markers, which are not frame headers.
  if (buf.length >= 4 && buf.readUInt16BE(0) === 0xffd8) {
    let offset = 2
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset++
        continue
      }
      const marker = buf[offset + 1]
      const isSOF =
        marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)
      if (isSOF) {
        return {
          height: buf.readUInt16BE(offset + 5),
          width: buf.readUInt16BE(offset + 7),
        }
      }
      // Standalone markers carry no length payload.
      if (
        marker === 0xd8 ||
        marker === 0x01 ||
        (marker >= 0xd0 && marker <= 0xd9)
      ) {
        offset += 2
        continue
      }
      offset += 2 + buf.readUInt16BE(offset + 2)
    }
  }

  return null
}
