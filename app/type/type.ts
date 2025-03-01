export type ImageType = {
  id: string,
  property_id: string,
  image: string
}
export type PropertyType = {
  id: string,
  title: string,
  price_per_night: number,
  images: ImageType[],
  description: string,
}