import { useFilterStore } from '../../shared/store/filtersStore';

const Filters = () => {
  const hasProjector = useFilterStore((state) => state.hasProjector);
  const hasWhiteboard = useFilterStore((state) => state.hasWhiteboard);
  const toggleProjector = useFilterStore((state) => state.toggleProjector);
  const toggleWhiteboard = useFilterStore((state) => state.toggleWhiteboard);
  const setMinCapacity = useFilterStore((state) => state.setMinCapacity);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const checkboxClasses =
    'h-5 w-5 cursor-pointer appearance-none rounded-md border border-[#C9B39A] bg-[#FAF6F0] transition-colors checked:border-[#8B5E34] checked:bg-[#8B5E34] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/50';

  return (
    <form className="flex flex-wrap items-center gap-4 text-base text-[#3D2B1F]">
      <label className="flex cursor-pointer items-center gap-2 select-none">
        <input
          type="checkbox"
          className={checkboxClasses}
          checked={hasProjector}
          onChange={() => toggleProjector()}
        />
        Есть проектор
      </label>

      <label className="flex cursor-pointer items-center gap-2 select-none">
        <input
          type="checkbox"
          className={checkboxClasses}
          checked={hasWhiteboard}
          onChange={() => toggleWhiteboard()}
        />
        Есть доска
      </label>

      <input
        className="w-36 rounded-xl border border-[#E4D5C1] bg-[#FAF6F0] px-3 py-1.5 text-[#3D2B1F] placeholder-[#A89279] transition-colors focus:border-[#C49A6C] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/40"
        type="number"
        min={0}
        placeholder="Вместимость"
        onChange={(e) => setMinCapacity(Number(e.target.value))}
      />

      <button
        type="button"
        className="ml-auto rounded-xl bg-[#8B5E34] px-4 py-1.5 font-medium text-[#FAF6F0] transition-colors hover:bg-[#6F4A29] active:bg-[#5A3B20] focus:outline-none focus:ring-2 focus:ring-[#C49A6C]/60"
        onClick={() => resetFilters()}
      >
        Сбросить фильтры
      </button>
    </form>
  );
};

export default Filters;
