import React, { useContext } from "react";

import { Context } from "../../utilis/context";

import { ToastContainer, toast } from "react-toastify";

import { deleteDocument } from "../../utilis/firebaseFunctions";

const DeleteModal = ({ location }) => {
  const { deletes, setDeletes } = useContext(Context);

  const onSubmit = async () => {
    await deleteDocument("location", "id", location.id);
    setDeletes(!deletes);
    toast.success("Location deleted!");
  };

  return (
    <>
      {location && (
        <div
          className={`min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4 bg-modaltransparent h-[100vh] w-[100vw] absolute top-0 z-10 right-0 ease-in-out delay-75 ${
            deletes ? "grid" : "hidden"
          }`}
        >
          <div className="sm:max-w-lg row-start-2 w-full lg:ml-72 min-w-0 rounded-t-3xl bg-white p-[--gutter] shadow-lg ring-1 ring-grey [--gutter:theme(spacing.8)] sm:mb-auto sm:rounded-2xl dark:ring-white/10 forced-colors:outline">
            <h2 className="text-balance text-lg font-semibold text-black sm:text-base dark:text-white">
              Delete Location
            </h2>
            <p className="mt-2 text-pretty text-base text-black sm:text-sm">
              Are you sure you want to delete this location? This action cannot
              be reversed.
            </p>

            <div className="mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto">
              <button
                className="cursor-pointer relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[disabled]:opacity-50 [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-0.5 [&amp;>[data-slot=icon]]:size-5 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--btn-icon] [&amp;>[data-slot=icon]]:sm:my-1 [&amp;>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent text-black data-[active]:bg-black bg-white hover:bg-liltransparent"
                type="button"
                onClick={() => setDeletes(!deletes)}
              >
                Cancel
                <span
                  className="absolute  left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
                  aria-hidden="true"
                ></span>
              </button>
              <button
                className="bg-red text-white  cursor-pointer relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[disabled]:opacity-50 [&amp;>[data-slot=icon]]:-mx-0.5 [&amp;>[data-slot=icon]]:my-0.5 [&amp;>[data-slot=icon]]:size-5 [&amp;>[data-slot=icon]]:shrink-0 [&amp;>[data-slot=icon]]:text-[--btn-icon] [&amp;>[data-slot=icon]]:sm:my-1 [&amp;>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow  after:absolute after:inset-0 after:-z-10 "
                type="button"
                onClick={onSubmit}
              >
                Yes
                <span
                  className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
                  aria-hidden="true"
                ></span>
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default DeleteModal;
