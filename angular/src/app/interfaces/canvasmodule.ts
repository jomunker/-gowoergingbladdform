export interface CanvasModule {
  _id: string,
  type: string,
  position: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  content: any
}
