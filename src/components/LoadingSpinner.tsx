import { ClipLoader } from 'react-spinners'

interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="space-y-10 text-center">
        <ClipLoader color="white" size={120} speedMultiplier={0.75} />
        <p className="font-mono text-3xl">{message}</p>
      </div>
    </div>
  )
}
