import { useState } from "react";

const SortableList: React.FC = () => {
  const [sports, setSports] = useState<string[]>([
    "Football",
    "Basketball",
    "Baseball",
    "Soccer",
    "Hockey",
    "Running",
    "Chess",
    "Karate",
    "Kungfu",
  ]);
  const [dragItemIndex, setDragItemIndex] = useState<number | undefined>();
  const [dragOverItemIndex, setDragOverItemIndex] = useState<
    number | undefined
  >();

  const handleDragStart = (index: number) => {
    setDragItemIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  };

  const handleDrop = (index: number) => {
    const _sports = [...sports];
    const dragItem = _sports.splice(dragItemIndex!, 1)[0];
    _sports.splice(index, 0, dragItem);
    setSports(_sports);
  };

  const handleDragEnter = (index: number) => {
    setDragOverItemIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverItemIndex(undefined);
  };

  const handleDragEnd = () => {
    setDragItemIndex(undefined);
    setDragOverItemIndex(undefined);
  };

  return (
    <div className="mt-5">
      <h1 className="text-3xl mb-5">Favorite Sports</h1>
      <div>
        {sports.map((sport, index) => (
          <li
            key={index}
            className={
              dragOverItemIndex === index
                ? "flex p-0 min-w-[300px] text-xl bg-gray-200 cursor-grab rounded-lg opacity-20 border my-2"
                : "flex p-0 min-w-[300px] text-xl bg-gray-200 cursor-grab rounded-lg my-2"
            }
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
          >
            <span className="mr-2.5 text-xl font-bold p-2.5 pr-4">{index}</span>
            <h3 className="p-2.5 m-0">{sport}</h3>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SortableList;
