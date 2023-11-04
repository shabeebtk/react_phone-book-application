import React, { useEffect, useState } from "react";
import './contact.css'
import { FaPhoneAlt, FaSms, FaTrash } from 'react-icons/fa';


function Contact() {

    const [Contacts, setContacts] = useState(JSON.parse(localStorage.getItem('Contacts')) || [])
    const [nameInput, setNameInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortAscending, setSortAscending] = useState(true);

    useEffect(() => {
        localStorage.setItem('Contacts', JSON.stringify(Contacts));
    }, [Contacts])

    const handleNameInput = (e) => {
        setNameInput(e.target.value)
    }
    const handlePhoneInput = (e) => {
        setPhoneInput(e.target.value)
    }

    const addContact = () => {
        console.log(phoneInput.length);
        if (nameInput.length > 3 && phoneInput.length == 10) {

            setContacts(
                [...Contacts, {
                    id: Date.now(),
                    name: nameInput,
                    phone: phoneInput
                }]
            )
            setNameInput('')
            setPhoneInput('')
            setSearchQuery('')
        }

        console.log(Contacts)
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    let searchResult = Contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.phone.toLowerCase().includes(searchQuery.toLowerCase())
    });


    const handleSortToggle = () => {
        setSortAscending((prevSortAscending) => !prevSortAscending);

        const sortedContacts = [...Contacts].sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (sortAscending) {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });
        setContacts(sortedContacts);
    };

    const deleteContact = (key) => {
        const updatedContact = Contacts.filter(contact => contact.id !== key)
        setContacts(updatedContact)
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Contact app</h2>

            <div className="add_contact_div_main">
                <div className="add_contact_div">

                    <div className="input-box">
                        <label className="input-label">Name</label>
                        <input onChange={handleNameInput} value={nameInput} className="input" type="text" />
                        {
                            nameInput.length < 3 ?
                                <span className="input-helper">name atleast 3 character</span>
                                :
                                <span className="input-helper"></span>
                        }
                    </div>

                    <div className="input-box">
                        <label className="input-label">Phone</label>
                        <input onChange={handlePhoneInput} value={phoneInput} placeholder="+91" className="input" type="number" />
                        {
                            phoneInput.length != 10 ?
                                <span className="input-helper">enter a valid number</span>
                                :
                                <span className="input-helper"></span>
                        }
                    </div>

                    <div style={{ paddingTop: '17px' }}>
                        <button onClick={addContact}>add contact</button>
                    </div>
                </div>
            </div>


            {Contacts.length != 0 ?
                <div className="contact_bg">
                    <div className="contact_body">
                        <div>
                            <div className="search_section">
                                <button onClick={handleSortToggle}>sort</button>
                                <input onChange={handleSearch} value={searchQuery} type="text" className="search_input" placeholder="search here.." />
                            </div>

                            {
                                searchQuery.length > 0 ?

                                    <div>
                                        {searchResult.map((contact, key) => (
                                            <div className="contact_card">
                                                <div style={{ fontWeight: 600 }}>
                                                    name : {contact.name}
                                                    <br />
                                                    phone : +91 {contact.phone}
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button> <FaPhoneAlt />
                                                    </button>

                                                    <button>
                                                        <FaSms />
                                                    </button>

                                                    <button onClick={() => deleteContact(contact.id)}> <FaTrash /> </button>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    :
                                    <div>
                                        {Contacts.map((contact, key) => (
                                            <div className="contact_card">
                                                <div style={{ fontWeight: 600 }}>
                                                    name : {contact.name}
                                                    <br />
                                                    phone : +91 {contact.phone}
                                                </div>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <button> <FaPhoneAlt />
                                                    </button>
                                                    <button>
                                                        <FaSms />
                                                    </button>
                                                    <button onClick={() => deleteContact(contact.id)}> <FaTrash /> </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                            }
                            {searchResult.length == 0 ? <center style={{ fontWeight: 500 }}>No search results</center> : <></>}

                        </div>
                    </div>
                </div>
                :
                <div className="contact_bg">
                    <div className="contact_body">
                        <div>
                            <center style={{ fontWeight: 500 }}>No Contacts Available</center>
                        </div>
                    </div>
                </div>
            }
        </>
    )


}

export default Contact;