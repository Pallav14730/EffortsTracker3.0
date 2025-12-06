"use client";
import { Activities } from "@/lib/Data";
import { ArrowBigDown, ArrowDown01Icon, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function Header() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="p-2 bg-[#f3f4f6] space-y-4  shadow-md">
      <div className="grid grid-cols-7 rounded-xl bg-[#E7ECF6] px-2 py-1">
        {Activities.map((activity) => {
          const isActive = activeTab === activity.id;
          return (
            <div key={activity.id} onClick={() => setActiveTab(activity.id)}>
              <div
                className={`text-center text-xs py-1 font-medium cursor-pointer rounded-md
                transition-all duration-200 ${
                  isActive
                    ? "bg-white text-[#2E3A59] shadow-md border-b-2 border-[#4A90E2]"
                    : "text-[#2E3A59] hover:bg-[#F5F7FB]"
                } `}
              >
                {activity.title}
              </div>
            </div>
          );
        })}
        <div className="flex justify-center items-center hover:bg-[#f5f7fB] rounded-md space-x-2">
          <Link className="text-xs text-center " href="/profile">
            Profile
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-10 items-center justify-center gap-2 ">
        {Activities.find((act) => act.id === activeTab)?.Subactivities?.map(
          (Subactivity) => {
            return (
              <div
                key={`${activeTab}-${Subactivity.id}`}
                style={{ backgroundColor: Subactivity.color }}
                className={`text-xs text-white py-1  rounded-md   text-center cursor-pointer`}
              >
                {Subactivity.title}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
export default Header;
