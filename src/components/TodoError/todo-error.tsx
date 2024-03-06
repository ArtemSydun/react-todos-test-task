import React, { useEffect } from 'react'
import cn from 'classnames'
import { Errors } from '../../types/errors'

type Props = {
  errorType: Errors | undefined
  setError: (error: Errors | undefined) => void
}

export const TodoError: React.FC<Props> = ({
  errorType,
  setError,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setError(undefined)
    }, 3000)
  }, [setError])

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal',
        { 'hidden': errorType === null })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={(): void => setError(undefined)}
      />
      {`${errorType}`}
    </div>
  )
}
