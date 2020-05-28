export interface CanvasModule {
  _id: string,
  idHTML: number,
  type: string,
  position: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  content: string
}
