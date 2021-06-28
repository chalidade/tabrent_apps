export default function text({
value,
color,
margin,
size,
weight,
marginTop,
lineHeight
}){
return (
  <p style={{
    color: color,
    margin : margin,
    marginTop : marginTop,
    fontSize : size,
    fontWeight : weight,
    lineHeight : lineHeight,
  }}
  >
  {value}
  </p>
);
}
