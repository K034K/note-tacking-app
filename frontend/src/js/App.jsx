import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    const [form, setForm] = useState({ title: '', content: '' });
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({ title: '', content: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/notes').then(res => setNotes(res.data));
    }, []);

    const addNote = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/notes', form);
        setNotes([...notes, res.data]);
        setForm({ title: '', content: '' });
    };

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:5000/notes/${id}`);
        setNotes(notes.filter(note => note._id !== id));
    };

    const startEditNote = (note) => {
        setEditId(note._id);
        setEditForm({ title: note.title, content: note.content });
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditForm({ title: '', content: '' });
    };

    const confirmEdit = async (id) => {
        const res = await axios.put(`http://localhost:5000/notes/${id}`, editForm);
        setNotes(notes.map(note => note._id === id ? res.data : note));
        cancelEdit();
    };

    return (
        <div className='container'>
            <div className='row mb-4'>
                <div className='row'>
                    <h1>Notes</h1>
                </div>
                <form onSubmit={addNote}>
                    <div className='mb-3 row'>
                        <input
                            className='form-control'
                            placeholder="Title"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                        />
                    </div>
                    <div className='mb-3 row'>
                        <textarea
                            className='form-control'
                            rows="3"
                            placeholder="Content"
                            value={form.content}
                            onChange={e => setForm({ ...form, content: e.target.value })}
                        />
                    </div>
                    <div className='row'>
                        <button type="submit" className='btn btn-primary'>Add Note</button>
                    </div>
                </form>
            </div>
            <div className="row">
                {notes.map(note => (
                    <div className="col-md-4 mb-3" key={note._id}>
                        <div className="card">
                            <div className="card-body">
                                {editId === note._id ? (
                                    <>
                                        <input
                                            className='form-control mb-2'
                                            value={editForm.title}
                                            onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                        />
                                        <textarea
                                            className='form-control mb-2'
                                            rows="3"
                                            value={editForm.content}
                                            onChange={e => setEditForm({ ...editForm, content: e.target.value })}
                                        />
                                        <button className='btn btn-secondary btn-sm me-2' onClick={cancelEdit}>Cancel</button>
                                        <button className='btn btn-success btn-sm' onClick={() => confirmEdit(note._id)}>Confirm</button>
                                    </>
                                ) : (
                                    <>
                                        <h5>{note.title}:</h5> {note.content}
                                        <button className='btn btn-warning btn-sm float-end ms-2' onClick={() => startEditNote(note)}>Edit</button>
                                        <button className='btn btn-danger btn-sm float-end' onClick={() => deleteNote(note._id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;