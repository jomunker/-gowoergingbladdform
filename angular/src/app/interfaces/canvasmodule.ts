export interface CanvasModule {
  _id: string,
  idHTML: number, //count
  type: string, //category
  position: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  content: string
}
