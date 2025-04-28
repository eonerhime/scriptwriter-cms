"use client";

import { Listbox } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid"; // Make sure you have @heroicons/react installed

export default function CustomSelect({
  userRoles = [],
  pageData,
  setPageData,
  limitedActions,
  userPublished,
}) {
  const selectedRole = pageData?.role ?? "";

  return (
    <div className="flex flex-col gap-2 mb-3 w-full sm:w-6/12">
      <label htmlFor="role" className="text-sm font-semibold">
        Set User Role
      </label>
      <Listbox
        value={selectedRole}
        onChange={(value) =>
          setPageData((prev) => ({
            ...prev,
            role: value,
          }))
        }
        disabled={limitedActions}
      >
        <div className="relative">
          <Listbox.Button
            id="role"
            name="role"
            required={userPublished}
            className="relative w-full h-12 cursor-pointer rounded-md bg-gray-100 dark:bg-gray-800 py-2 pl-4 pr-10 text-left text-gray-900 dark:text-gray-100 shadow-md border focus:outline-none focus:ring-2 focus:ring-white capitalize"
          >
            <span className="block truncate">
              {selectedRole || "-- Select a Role --"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {userRoles.map((userRole) => (
              <Listbox.Option
                key={userRole.id}
                value={userRole.role}
                as={Fragment}
              >
                {({ active, selected }) => (
                  <li
                    className={`list-none cursor-pointer select-none relative py-2 pl-4 pr-4 ${
                      active
                        ? "bg-accent-950 text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <span
                      className={`block truncate capitalize ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {userRole.role}
                    </span>
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
