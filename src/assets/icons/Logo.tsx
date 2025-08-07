export default function Logo() {
  return (
    <svg
      viewBox="0 0 40 30"
      width="50"
      height="50"
      xmlns="http://www.w3.org/2000/svg"
      data-logo="logo"
    >
      <g
        style={{ opacity: 1 }}
        transform="translate(0, 30) rotate(270) translate(15, 20) scale(1, -1) translate(-15, -20)"
        id="logogram"
      >
        <path
          fill="#1C97E3"
          d="M15 0L20.4545 5.33333L0 25.3333V14.6667L15 0Z"
        ></path>
        <path
          fill="#F45273"
          d="M2.90827 28.177L15 40L30 25.3334V14.6667L20.4545 5.33337L0 25.3334L0.0041688 25.3375L20.4545 5.33337V20.6667L11.25 29.6667V20.1324L2.90827 28.177Z"
        ></path>
      </g>
      <g style={{ opacity: 1 }} transform="translate(40, 15)" id="logotype"></g>
    </svg>
  );
}
