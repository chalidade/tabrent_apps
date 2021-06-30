export default function images({
image,
background,
height,
width,
size,
repeat,
position,
radius,
}){
  return (
    <div
      style={{
        height:height,
        width : width,
        background:`url(${image})`,
        backgroundSize:size,
        backgroundRepeat:repeat,
        backgroundPosition:position,
        borderRadius : radius,
      }}
    ></div>
  );
}
