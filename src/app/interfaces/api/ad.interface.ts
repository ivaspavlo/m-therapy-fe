export enum AdType {
  COUNTDOWN,
  FOOTER
}

export interface IAd {
  type: AdType,
  title: string,
  content: string,
  endDate?: number,
  link?: string
}
