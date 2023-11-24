const getAll = require('./contacts');
// const fs = require('fs/promises');
const { program } = require('commander');

const invokeAction =  ({ action, id, name, email, phone }) => {
   
    switch (action) {

        case 'list':
          // ...
          return getAll.listContacts();

        case 'get':
          // ... id
          return getAll.getContactById(id);
    
        case 'add':
          // ... name email phone
          return getAll.addContact({name, email, phone});
    
        case 'remove':
          // ... id
          return getAll.removeContact(id);
    
        default:
          console.warn('\x1B[31m Unknown action type!');
    };
}

// --action >, -a, --id > -i, --data > d
program
.option('-a, --action, <type>')
.option('-i, --id, <type>')
.option('-n, --name, <type>')
.option('-e, --email <type>')
.option('-p, --phone <type>');

program.parse();
const option = program.opts();

invokeAction(option).then(responce => console.log(responce));

// invokeAction({action: 'list', id:'AeHIrLTr6JkxGE6SN-0Rw', data: {name: 'Jack', email: 'i@.ua', phone: '1234334343'}}).then(responce => console.log(responce));

