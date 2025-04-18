interface Props {
  numbers: number;
}

export default function NumberFormat({ numbers }: Props) {
  return numbers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
