export default function Button (props: any) {
  return (
    <button {...props} >{props.children}</button>
  );
}