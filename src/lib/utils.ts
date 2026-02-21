export function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export function randomDelay(min = 300, max = 800) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}
