export interface DataInput {
  date: string;
  duration: string;
  distance: number;
}

export interface DbValue extends DataInput {
  id: number;
}
