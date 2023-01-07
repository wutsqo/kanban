import React from "react"

interface UseDialogProps {
  onHide?: () => void
}

export const useDialog = (props: UseDialogProps = {}) => {
  const ref = React.useRef(null)
  const [show, setShow] = React.useState(false)
  const handleShow = React.useCallback(() => setShow(true), [])
  const handleHide = () => {
    setShow(false)
    if (typeof props?.onHide === "function") props.onHide()
  }
  const handleToggleVisibility = () => (show ? handleHide() : handleShow())

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (!show) return
      if (event.key !== "Escape") return

      event.preventDefault()
      event.stopPropagation()
    }

    if (show) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [show])

  return {
    ref,
    show,
    handleShow,
    handleHide,
    handleToggleVisibility,
  }
}
