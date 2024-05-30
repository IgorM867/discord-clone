"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SvgXIcon } from "./svgIcons/SvgXIcon";

type ModalProps = {
  headerLabel?: string;
  searchParam: "newChannelDialog" | "inviteUsersDialog";
  children: ReactNode;
};

function Modal({ headerLabel, searchParam, children }: ModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const showDialog = searchParams.get(searchParam);

  useEffect(() => {
    if (showDialog === "true") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeModal = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) =>
    e.target === dialogRef.current && router.back();

  const dialog: JSX.Element | null =
    showDialog === "true"
      ? createPortal(
          <dialog
            ref={dialogRef}
            onClick={closeModal}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-md max-w-lg bg-d-gray-400 backdrop:bg-black/60 min-w-[450px] text-d-white overflow-hidden"
          >
            {headerLabel && (
              <header className="flex justify-between p-5">
                <h2 className="text-2xl">{headerLabel}</h2>
                <SvgXIcon
                  width={28}
                  height={28}
                  className="fill-d-gray-150 hover:fill-d-gray-100 cursor-pointer"
                  onClick={() => {
                    router.back();
                  }}
                />
              </header>
            )}
            {children}
          </dialog>,
          document.body
        )
      : null;
  return dialog;
}

export { Modal };
