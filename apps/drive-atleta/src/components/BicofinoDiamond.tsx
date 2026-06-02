interface Props {
  color?: string
  size?: number
}

/* A marca Bicofino — o diamante/✦ em vetor. Assinatura quieta (DESIGN.md §1.6). */
export function BicofinoDiamond({ color = 'currentColor', size = 18 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path
        d="M375.44,200.22c-49.29,1.09-108.78,6.97-142.05,47.77-27.72,33.99-31.82,82.12-33.39,124.41-1.7-51.07-8.08-110.18-52.64-142.47-33.94-24.59-81.99-28.82-122.8-29.71,50.47-1.09,110.17-6.81,143.5-49.48,25.53-32.69,31.44-82.73,31.83-123.15h.22c.46,40.19,6.03,89.21,30.93,122.03,33.12,43.66,93.44,49.53,144.4,50.6Z"
        fill={color}
      />
    </svg>
  )
}
