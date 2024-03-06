import React, { useEffect } from 'react'
import cn from 'classnames'
import { Errors } from '../../types/errors'

type Props = {
  errorType: Errors | null
  setErrorType: (error: Errors | null) => void
}

export const TodoError: React.FC<Props> = ({
  errorType,
  setErrorType,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setErrorType(null)
    }, 3000)
  }, [setErrorType])

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
        onClick={() => setErrorType(null)}
      />
      {/* show only one message at a time */}
      {`${errorType}`}
    </div>
  )
}
