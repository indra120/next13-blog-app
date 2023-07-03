'use client' // Error components must be Client Components

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      ˆ<h2>Something went wrong!</h2>
      <code>{error.message}</code>
      <code>{error.stack}</code>
      <code>{error.name}</code>
      <code>{`${error.cause}`}</code>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

export default Error