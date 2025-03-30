import dayjs, { Dayjs } from 'dayjs'
import vMasker from 'vanilla-masker'

export function formatByMask(value: string, mask: string) {
  return vMasker.toPattern(value, mask)
}

export function formatToMoney(value: string | number) {
  return vMasker.toMoney(value.toString(), {
    separator: ',',
    delimiter: '.',
    unit: 'R$',
  })
}

export function formatDate(date: Date | Dayjs | string) {
  return dayjs(date).format('DD/MM/YYYY')
}
