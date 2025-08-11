import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import * as noteService from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

import css from "./App.module.css";

function App() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, page],
    queryFn: () =>
      noteService.fetchNotes({
        page,
        search: debouncedSearchQuery,
      }),
  });

  const createNoteMutation = useMutation({
    mutationFn: noteService.createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: noteService.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setPage(1); 
  };

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };
  
  const handleCreateNote = (values: noteService.CreateNotePayload) => {
    createNoteMutation.mutate(values);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {error.message}</p>}
        {data && data.notes.length > 0 && (
          <NoteList notes={data.notes} onDelete={handleDeleteNote} />
        )}
      </main>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateNote}
        />
      </Modal>
    </div>
  );
}

export default App;
