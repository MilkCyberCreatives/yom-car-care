export function waLink(message: string, phoneE164 = '243848994045') {
  // phoneE164 must be digits only (no +)
  const text = encodeURIComponent(message)
  return `https://wa.me/${phoneE164}?text=${text}`
}
