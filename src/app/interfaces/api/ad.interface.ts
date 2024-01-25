export enum AdType {
  COUNTDOWN = 'COUNTDOWN',
  FOOTER = 'FOOTER'
}

export interface IAd {
  type: AdType,
  title: string,
  content: string,
  endDate?: number,
  link?: string
}
