/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function DashboardFooter({ isExpanded }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${
        isExpanded ? "pl-0 md:pl-[250px]" : "pl-0"
      } max-h-[50px] w-full overflow-hidden bg-white p-4 shadow-md transition-all duration-500`}
    >
      <div className="container mx-auto flex h-full w-full items-center justify-center">
        <p className="text-[12px] sm:text-[16px]">
          &copy; {currentYear} Flex Fusion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
