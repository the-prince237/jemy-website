export function textCutter(text: string, amount?: number, mode?: 'letters' | 'words') {
  const joiner = mode === 'letters' ? '' : ' ';
  const _amount = amount || (mode === 'letters' ? 30 : 15);

  const cuttedText = text.split(joiner).splice(0, _amount).join(joiner);
  return text !== cuttedText ? cuttedText + '...' : cuttedText;
}

export function obscureEmail(email: string | undefined) {
  if (email) {
    const [name, domain] = email.split('@');
    return `${name[0]}${new Array(name.length).join('*')}@${domain}`;
  }

  return '';
}

export const priceString = (price: number, currency: string) => {
  return price === 0 ? null : `${currency}${price.toLocaleString()}`;
};
