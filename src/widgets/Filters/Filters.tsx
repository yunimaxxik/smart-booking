import { useFilterStore } from '../../shared/store/filtersStore';

const Filters = () => {
  const hasProjector = useFilterStore((state) => state.hasProjector);
  const hasWhiteboard = useFilterStore((state) => state.hasWhiteboard);
  const toggleProjector = useFilterStore((state) => state.toggleProjector);
  const toggleWhiteboard = useFilterStore((state) => state.toggleWhiteboard);
  const setMinCapacity = useFilterStore((state) => state.setMinCapacity);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  return (
    <form className="flex flex-row gap-2.5 text-lg mb-2.5">
      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={hasProjector}
          onChange={() => toggleProjector()}
        />
        Есть проектор
      </label>

      <label className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={hasWhiteboard}
          onChange={() => toggleWhiteboard()}
        />
        Есть доска
      </label>
      <input
        className="block border rounded-xl pl-2"
        type="number"
        placeholder="Вместимость"
        onChange={(e) => setMinCapacity(Number(e.target.value))}
      />
      <input
        className="bg-amber-100 px-2.5 py-1 cursor-pointer hover:bg-amber-400 rounded-xl"
        type="button"
        value="Сбросить фильтры"
        onClick={() => resetFilters()}
      />
    </form>
  );
};

export default Filters;
