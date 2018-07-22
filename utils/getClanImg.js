export default function getClanImg(clan, prefix) {
  if (clan.img)
    return location.href + 'static/' + prefix + '_' + clan.img + '.png';
  return location.href + 'static/' + prefix + '.png';
}
