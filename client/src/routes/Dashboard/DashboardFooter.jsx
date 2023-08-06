/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

export default function DashboardFooter({ isExpanded }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`${
        isExpanded ? "pl-0 md:pl-[250px]" : "pl-0"
      } w-full max-h-[50px] p-4 bg-white shadow-bs transition-all duration-500 overflow-hidden`}
    >
      <div className="w-full h-full container mx-auto flex items-center justify-center">
        <p className="text-[12px] sm:text-[16px]">
          &copy; {currentYear} Flex Fusion. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
