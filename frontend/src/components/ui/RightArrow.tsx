/* eslint-disable @typescript-eslint/no-explicit-any */
// RightArrow component with corrected onClick prop
const RightArrow = (props: any) => {
  const { onClick } = props;

  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="right-arrow size-8 text-black font-bold cursor-pointer"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default RightArrow;
