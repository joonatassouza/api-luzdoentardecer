export function clearString(text) {
  return text
    .replace('[vc_row]', '')
    .replace('[vc_column]', '')
    .replace('[vc_column_text]', '')
    .replace('[/vc_row]', '')
    .replace('[/vc_column]', '')
    .replace('[/vc_column_text]', '')
    .split('&#038;')
    .join('&')
    .replace(/<\/?[^>]+(>|$)|(\[vc_btn)(.*)(])/g, '')
    .replace(/&(nbsp|amp|quot|lt|gt|#)[0-9\(\)]+;/g, '')
    .split('&#8211;')
    .join('-')
    .split('&#8220;')
    .join('"')
    .split('&nbsp;')
    .join(' ')
    .split('&amp;')
    .join('&')
    .split('&#8221;')
    .join('"')
    .split('&#8221;')
    .join('"')
    .split('(36,5&#215;31,5)')
    .join('')
    .trim();
}

export function extractUrlYoutubeEmbed(text) {
  try {
    const decoded = decodeURIComponent(text);

    const regexMatch = decoded.match(
      /(http|https)\:\/\/([A-Za-z0-9\?\+&=./-])+?version/
    );

    return regexMatch
      ? regexMatch[0].substring(0, regexMatch[0].length - 8)
      : '';
  } catch (e) {
    return '';
  }
}
