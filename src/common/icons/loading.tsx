import React from 'react';

function Loading(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  const css = `.nc-loop-dots-3-48-icon-f>*{--animation-duration:0.8s;transform-origin:50% 50%;animation:nc-loop-dots-3-anim var(--animation-duration) infinite}.nc-loop-dots-3-48-icon-f>:nth-child(2){animation-delay:.1s}.nc-loop-dots-3-48-icon-f>:nth-child(3){animation-delay:.2s}@keyframes nc-loop-dots-3-anim{0%,100%,60%{transform:translateY(0)}30%{transform:translateY(20%)}}`;

  return (
    <svg height="48" width="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor">
        <g className="nc-loop-dots-3-48-icon-f">
          <circle cx="6" cy="24" r="5" />
          <circle cx="24" cy="24" r="5" />
          <circle cx="42" cy="24" r="5" />
        </g>
        <style>{css}</style>
      </g>
    </svg>
  );
}

export default Loading;
