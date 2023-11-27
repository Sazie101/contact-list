'use strict';

import { onEvent, select, selectById, selectAll, print } from "./utility.js";
import { Contact } from "./contact.js";

const contacts = selectById('contactsContainer');
const counter = selectById('counter');
const contactInput = selectById('contactInput');
const add = selectById('add');
const corrections = select('.corrections');
const contactsArray = [];

function listContacts(name, city, email) {
    const newContact = new Contact(name, city, email);
    contactsArray.unshift(newContact);

    const contactDiv = document.createElement('div');
    contactDiv.className = 'contact';
    
    const nameParagraph = document.createElement('p');
    const cityParagraph = document.createElement('p');
    const emailParagraph = document.createElement('p');

    nameParagraph.innerText = `Name: ${newContact.name}`;
    cityParagraph.innerText = `City: ${newContact.city}`;
    emailParagraph.innerText = `Email: ${newContact.email}`;

    contactDiv.appendChild(nameParagraph);
    contactDiv.appendChild(cityParagraph);
    contactDiv.appendChild(emailParagraph);
    onEvent('click', contactDiv, () => {
        removeContact(contactDiv, newContact)
    });

    contacts.appendChild(contactDiv);
    contactInput.value = '';

    updateCounter();
}

function getValidation(name, city, email) {
    const nameAndCityRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (nameAndCityRegex.test(name) && nameAndCityRegex.test(city) && emailRegex.test(email)) {
        listContacts(name, city, email)
    } else {
        corrections.innerText = 'Invalid input!';
    }
}

function addContact() {
    const contactInfo = contactInput.value;
    const contactValues = contactInfo.split(',').map(value => value.trim());

    if (contactValues.length === 3) {
        if (contactsArray.length < 10) {
            getValidation(contactValues[0], contactValues[1], contactValues[2]);
            corrections.innerText = '';
        } else {
            corrections.innerText = 'You have reached the maximum number of contacts!';
        }
    } else {
        corrections.innerText = 'Please provide Name, City, and Email separated by commas.';
    }
}

function removeContact(contactDiv, contact) {
    const index = contactsArray.indexOf(contact);
    contactsArray.splice(index, 1);
    contacts.removeChild(contactDiv);
    corrections.innerText = '';
    updateCounter();
}

function updateCounter() {
    counter.textContent = `Contacts: ${contactsArray.length}`;
}

onEvent('click', add, (event) =>{
    event.preventDefault();
    addContact();
});

onEvent('load', window, () => {
    contactInput.value = '';
});