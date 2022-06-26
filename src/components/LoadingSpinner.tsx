import { BounceLoader } from 'react-spinners'

interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="grid h-80 place-items-center">
      <div className="flex flex-col items-center gap-y-10">
        <div className="h-40 w-40">
          <BounceLoader color="white" size={150} speedMultiplier={1.3} />
        </div>
        <p className="text-center font-mono text-3xl">{message}</p>
      </div>
    </div>
  )
}
