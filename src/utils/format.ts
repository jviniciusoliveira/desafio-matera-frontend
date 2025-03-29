import vMasker from 'vanilla-masker'

export function formatByMask(value: string, mask: string) {
  return vMasker.toPattern(value, mask)
}
