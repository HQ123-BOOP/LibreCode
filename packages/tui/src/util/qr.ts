import QRCode from "qrcode"

export function renderQr(text: string): string[] {
  const qr = QRCode.create(text, { errorCorrectionLevel: "L" })
  const size = qr.modules.size
  const quiet = 2
  const full = size + quiet * 2

  const get = (row: number, col: number): boolean => {
    if (row < quiet || row >= size + quiet || col < quiet || col >= size + quiet) return false
    return qr.modules.get(row - quiet, col - quiet) === 1
  }

  const rows: string[] = []
  for (let row = 0; row < full; row += 2) {
    let line = ""
    for (let col = 0; col < full; col++) {
      const top = get(row, col)
      const bottom = row + 1 < full ? get(row + 1, col) : false
      if (top && bottom) line += "█"
      else if (top) line += "▀"
      else if (bottom) line += "▄"
      else line += " "
    }
    rows.push(line)
  }
  return rows
}
