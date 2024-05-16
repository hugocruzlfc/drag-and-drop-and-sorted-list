import { DragDropFiles, SortableList } from "./components";

function App() {
  return (
    <main className="flex flex-col items-center justify-center my-20 box-border">
      <DragDropFiles />
      <SortableList />
    </main>
  );
}

export default App;
