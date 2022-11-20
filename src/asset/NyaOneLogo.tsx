import { SVGProps } from 'react';

const NyaOneLogo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 1024 1024" {...props}>
    <path
      fillRule="evenodd"
      d="M512,0C229.23,0,0,229.23,0,512s229.23,512,512,512,512-229.23,512-512S794.77,0,512,0ZM768,721a48,48,0,0,1-48,48H560a48,48,0,0,1-48-48v-1a48,48,0,0,1,48-48h30.79L353,423.79V720a48,48,0,0,1-48,48h-1a48,48,0,0,1-48-48V304a49.15,49.15,0,0,1,84.3-33.68l257.7,269V431l-1.46,1.62a48,48,0,0,1-67.78,3.63l-.75-.66a48,48,0,0,1-3.63-67.79L607.77,275A47.93,47.93,0,0,1,646,256h1a48,48,0,0,1,48,48V672h25a48,48,0,0,1,48,48Z"
      clipRule="evenodd"
    />
  </svg>
);

export default NyaOneLogo;
