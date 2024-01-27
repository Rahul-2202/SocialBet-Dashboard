interface TabProps {
  activeTab: string;
  tabName: string;
  setTab: (tabName: string) => void;
}

export function Tab({ activeTab, tabName, setTab }: TabProps) {
  return (
    <button
      className={`text-lg text-[#f1f1ef] ${
        activeTab === tabName ? "bg-[#7053ff]" : ""
      } px-4 py-2 rounded-lg border border-[#7053ff]`}
      onClick={() => setTab(tabName)}
    >
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </button>
  );
}
