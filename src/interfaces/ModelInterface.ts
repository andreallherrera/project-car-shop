export interface Model<T> {
  create(object: T): Promise<T>, 
  read(): Promise<T[]>,
  readOne(string: string): Promise<T | null>,
  update(string: string, object: T): Promise<T | null>,
  delete(string: string): Promise<T | null>
}