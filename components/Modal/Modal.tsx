import { forwardRef } from "react"
import { Dialog } from "@headlessui/react"
import { XIcon } from "../Icons"
import { Nunito_Sans } from "@next/font/google"
import classNames from "classnames"

interface Props {
  show: boolean
  onDismiss: (show: boolean) => void
  children: React.ReactNode
  title: string
}

const nunitoSans = Nunito_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
})

export const Modal = forwardRef<HTMLDivElement, Props>(
  ({ show, onDismiss, children, title }, ref) => {
    return (
      <Dialog
        as="div"
        className={classNames(
          "fixed inset-0 z-10 overflow-y-auto",
          nunitoSans.className
        )}
        onClose={() => onDismiss(false)}
        open={show}
      >
        <div className="px-4 pt-4 pb-20 text-center sm:p-0">
          <Dialog.Overlay className="fixed inset-0 bg-[#404040] bg-opacity-50" />

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            ref={ref}
            className="mx-4 inline-block transform overflow-hidden rounded-xl px-6 pb-6 align-middle shadow-xl bg-white w-full max-w-md"
          >
            <div className="flex justify-between items-center text-lg font-bold h-16">
              {title}
              <button title="Close Modal" onClick={() => onDismiss(false)}>
                <XIcon />
              </button>
            </div>
            {children}
          </div>
        </div>
      </Dialog>
    )
  }
)

Modal.displayName = "Modal"
