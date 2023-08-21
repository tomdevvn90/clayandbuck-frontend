export default function AdSlot(props) {
  const { id, customStyle } = props;
  return <div className="text-center" id={id} style={customStyle} />;
}
